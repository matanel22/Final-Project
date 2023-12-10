import styled from "styled-components";

import axios from "axios";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import { idPrj, missionProj } from "../atom/Atom";

import { MISSION_UPDATE } from "./updateTask";
import { ShellForForms } from "../shellForForms";
import SuccessMessage from "../MessegeToUser";
import { AppBar } from "@mui/material";
import { ButtonsPageTask } from "./ButtonsPageTask";

interface IFormMission {
  discrption: string;
  projectId: string;
  date_created: Date;
  statusId: string;
  endDate: Date;
  remarks: string;
  taskType: string;
}

const SELECTMISSION = [
  { option: "Frontend" },
  { option: "Design" },
  { option: "React" },
  { option: "DB" },
  { option: "Design" },
];
const CreateTasks = () => {
  const [ID, setId] = useRecoilState(idPrj);
  const [successCrationTask, setSuccessCrationTask] = useState(false);
  const isDateInRange = (startDate: any, endDate: any) => {
    // const checkDate = new Date(dateToCheck);
    const start = new Date(startDate);
    const end = new Date(endDate);

    return start >= end;
  };
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<IFormMission>({
    mode: "onChange",
    defaultValues: {},
  });

  const registerPrj: SubmitHandler<IFormMission> = async (data) => {
    const result = isDateInRange(data.date_created, data.endDate);

    data.projectId = ID;
    let url = "http://localhost:3001/api/routs/router/creatMission";
    await axios
      .post(url, data)

      .then((res) => {
        setSuccessCrationTask(true);
      })
      .catch((err) => {
        console.log("res", err);
      });
  };
  // useEffect(() => {
  //   console.log(successCrationTask);
  // }, [successCrationTask]);
  return (
    <>
      <AppBar
        sx={{
          flexGrow: 1,
          minHeight: 100,
        }}
        position="static"
      >
        <ButtonsPageTask />
      </AppBar>
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
          <label>סוג משימה</label>
          <select
            defaultValue={"יש לבחור"}
            {...register("taskType", { required: true })}
          >
            {SELECTMISSION.map((opt) => (
              <option>{opt.option}</option>
            ))}
          </select>
          <label>Remarks</label>
          <InputRemarks
            textLength={0}
            {...register("remarks", { required: true })}
          />
          <button type="submit">סיום </button>
        </FormContainer>

        {successCrationTask && (
          <SuccessMessage
            message="המשימה נוצרה בהצלחה"
            setSuccessCrationTask={setSuccessCrationTask}
            successCrationTask={successCrationTask}
          />
        )}
      </ShellForForms>
    </>
  );
};
export default CreateTasks;
const InputRemarks = styled.input<{ textLength: number }>`
  // width: 80%;
  // height: 10%;
  // padding: 10px;
  // font-size: 16px;

  padding: 8px;
  min-width: 100%; /* Set a minimum width */
  width: ${(props) => `${props.textLength * 8}px`};
  box-sizing: border-box; /* Include padding and border in the width */
  word-wrap: break-word;
  margin-bottom: 20px;
  border: none;
  border-radius: 5px;
  background-color: #e0e0e0;
`;
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
  background-color: #f2f2f2;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  // margin-top: 50px;
  height: min-content;
  width: 30%;
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
