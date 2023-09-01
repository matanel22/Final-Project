import styled from "styled-components";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import { idPrj, missionProj } from "../atom/Atom";
import { StatusMission } from "./StatusMission";
import { MISSION_UPDATE } from "./updateTask";
import { ShellForForms } from "../shellForForms";

interface IFormMission {
  // _id: String;
  discrption: string;
  // missionStatus: String;
  projectId: string;
  date_created: Date;
  statusId: string;
  endDate: Date;
  remarks: string;
}
const CreateTasks = () => {
  const [ID, setId] = useRecoilState(idPrj);
  const [dataMission, setDataMission] = useRecoilState(missionProj);
  // const [selectedStatus, setSelectedStatus] = useState([]);
  let histury = useHistory();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormMission>({
    mode: "onChange",
    defaultValues: {},
  });
  useEffect(() => {
    console.log(ID);
  }, []);

  const registerPrj: SubmitHandler<IFormMission> = async (data) => {
    data.projectId = ID;
    let url = "http://localhost:3001/api/routs/router/creatMission";
    await axios
      .post(url, data)

      .then((res) => {
        setDataMission(res.data);
        histury.push("tasks/" + ID);
      })
      .catch((err) => {
        console.log("res", err);
      });
  };

  return (
    <ShellForForms>
      <FormContainer onSubmit={handleSubmit(registerPrj)}>
        {MISSION_UPDATE.map((item: any) => (
          <>
            <label> {item.name}</label>
            <input
              {...register(item.register, { required: true })}
              placeholder={item.name}
              type={item.type}
            />
          </>
        ))}

        <button type="submit">סיום </button>
      </FormContainer>
    </ShellForForms>
  );
};
export default CreateTasks;

const Label = styled.label`
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
`;
const Option = styled.option`
  font-size: 1rem;
`;
const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  // margin: 20px;
  padding: 40px;
  // background-color: #f2f2f2;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  margin-top: 50px;
  max-width: 50%;
  h2 {
    margin-bottom: 20px;
  }
  select {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: none;
    border-radius: 5px;
    background-color: #e0e0e0;
  }
  label {
    display: block;
    font-weight: bold;
    margin-bottom: 10px;
  }

  input[type="text"],
  input[type="date"] {
    width: 100%;
    padding: 10px;
    margin-bottom: 20px;
    border: none;
    border-radius: 5px;
    background-color: #e0e0e0;

    &:focus {
      outline: none;
      background-color: #fff;
    }
  }

  button[type="submit"] {
    padding: 10px 20px;
    background-color: #5cb85c;
    color: #fff;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    // margin-top: 20%;
    &:hover {
      background-color: #449d44;
    }
  }
`;
