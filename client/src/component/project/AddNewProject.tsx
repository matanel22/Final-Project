//
import styled from "styled-components";

import React, { useEffect, useState } from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";

import { Link, useHistory } from "react-router-dom";
// import MultySelect from "react-select";
import { useRecoilState, useRecoilValue } from "recoil";
import { UserInfo, allUsers, userId, userName } from "../atom/Atom";
import { ShellForForms } from "../shellForForms";
import AnimatedMulti from "./MultySelect";
import SuccessMessage from "../MessegeToUser";
import SimpleAlert from "../MessegeToUser/MessMui";
import ButtonLoading from "../UI/ButtonLoadung";

export interface IUsers {
  _id: string;
  name: string;
  email: string;
  pass: string;
}
interface IFormInputs {
  nameProject: string;
  client: string;

  staff: [];
  statusProject: string;
  amountOfUsers: string;
}

const AddNewProject: React.FC = (props) => {
  const [successCration, setSuccessCration] = useState(false);

  // const [selectedItem, setSelectedItem] = useState("");
  // const [listUsers, setListUsers] = useRecoilState(allUsers);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const userInfo = useRecoilValue(UserInfo);

  const {
    register,

    formState: { errors, isDirty, isValid },
    handleSubmit,
  } = useForm<IFormInputs>({
    mode: "onChange",
    defaultValues: {
      nameProject: "",
      client: "",
      staff: [],
      statusProject: "",
      amountOfUsers: "",
    },
  });

  const registerPrj: SubmitHandler<IFormInputs> = async (data) => {
    try {
      let url = "http://localhost:3001/api/routs/router/addCreatProject";
      await axios.post(url, { data, selectedItems }).then(({ data }) => {
        setSuccessCration(true);
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <ShellForForms urlNav1={`/projects/${userInfo._id}`} urlNav2="">
      <FormContainer onSubmit={handleSubmit(registerPrj)}>
        <h2> יצירת פרוייקט</h2>
        {(errors.amountOfUsers ||
          errors.client ||
          errors.nameProject ||
          errors.staff) && <p style={{ color: "red" }}>{`שדה חובה חסר`}</p>}
        <label htmlFor="name">שם פרוייקט</label>
        <input
          type="text"
          id="name"
          {...register("nameProject", { required: true })}
        />
        {errors.nameProject && "חובה למלא שם פרוייקט"}
        <label htmlFor="name">שם הצוות</label>

        <AnimatedMulti
          staff={[]}
          setSelectedItems={setSelectedItems}
          selectedItems={selectedItems}
        />

        <label>שם הלקוח</label>
        <input type="text" {...register("client", { required: true })} />
        {errors.client && "חובה למלא שם לקוח"}

        <label>משתמשים </label>
        <input type="text" {...register("amountOfUsers", { required: true })} />
        {errors.amountOfUsers && " שדה חובה  "}
        <Label htmlFor="fruit-select">סטטוס פרוייקט </Label>
        <Selected
          placeholder="סטטוס פרוייקט"
          id="select"
          {...register("statusProject", { required: true })}
        >
          <Option>פעיל</Option>
          <Option>לא פעיל</Option>
        </Selected>
        {errors.statusProject && "שדה חובה"}
        <ButtonLoading textButton="סיום" />
      </FormContainer>
      {successCration && (
        <SuccessMessage
          message="הפרוייקט נוצר בהצלחה"
          setSuccessCration={setSuccessCration}
          successCration={successCration}
          url={"/projects/" + userInfo._id}
          typeAlert="success"
        />
      )}
    </ShellForForms>
  );
};
export default AddNewProject;

const Selected = styled.select`
  font-size: 1rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 35vw;
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
  // background-color: #f2f2f2;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  margin-top: 20px;
  height: 60vh;
  width: 35%;
  h2 {
    margin-bottom: 20px;
  }

  label {
    display: block;
    font-weight: bold;
    margin-bottom: 10px;
  }

  input[type="text"],
  input[type="email"],
  input[type="pass"] {
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
    margin-top: 2%;
    &:hover {
      background-color: #449d44;
    }
  }
`;
