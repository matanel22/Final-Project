//
import styled from "styled-components";

import React from "react";

import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";

import { Link, useHistory } from "react-router-dom";

import { useRecoilState } from "recoil";
import { allUsers, userId, userName } from "../atom/Atom";
import { ShellForForms } from "../shellForForms";

export interface IUsers {
  _id: string;
  name: string;
  email: string;
  pass: string;
}
interface IFormInputs {
  nameProject: string;
  client: string;
  staff: string;
  userId: string;
  statusProject: string;
  amountOfUsers: string;
}

const AddNewProject: React.FC = (props) => {
  const [useId, setUseId] = useRecoilState<string>(userId);

  const [listUsers, setListUsers] = useRecoilState(allUsers);

  let histury = useHistory();
  const {
    register,

    formState: { errors, isDirty, isValid },
    handleSubmit,
  } = useForm<IFormInputs>({
    mode: "onChange",
    defaultValues: {
      nameProject: "",
      client: "",
      staff: "",
      userId: "",
      statusProject: "",
      amountOfUsers: "",
    },
  });

  const registerPrj: SubmitHandler<IFormInputs> = async (data) => {
    console.log(listUsers);
    listUsers.map((item: any, index: any) => {
      if (item.name.trim() === data.staff.trim()) {
        data.userId = item._id;
        try {
          let url = "http://localhost:3001/api/routs/router/addCreatProject";
          axios.post(url, data).then(({ data }) => {
            console.log(useId);

            histury.push("/projects/" + data.userId);
            console.log(data);
          });
        } catch (error) {
          console.log(error);
        }
      }
    });
    // setUsersData(res.data);
  };

  return (
    <ShellForForms>
      <FormContainer onSubmit={handleSubmit(registerPrj)}>
        <h2> יצירת פרוייקט</h2>
        <label htmlFor="name">שם פרוייקט</label>
        <input
          type="text"
          id="name"
          {...register("nameProject", { required: true })}
        />
        {errors.nameProject && "חובה למלא שם פרוייקט"}
        <label htmlFor="name">שם הצוות</label>
        <input type="text" {...register("staff", { required: true })} />
        {errors.staff && "חובה למלא שם הצוות"}
        <label>שם הלקוח</label>
        <input type="text" {...register("client", { required: true })} />
        {errors.client && "חובה למלא שם לקוח"}
        <input type="hidden" value={useId} />
        <label>משתמשים </label>
        <input type="text" {...register("amountOfUsers", { required: true })} />
        {errors.amountOfUsers && " שדה חובה  "}
        <Label htmlFor="fruit-select">סטטוס פרוייקט </Label>
        <Select
          placeholder="סטטוס פרוייקט"
          id="select"
          {...register("statusProject", { required: true })}
        >
          <Option>פעיל</Option>
          <Option>לא פעיל</Option>
        </Select>
        {errors.statusProject && "שדה חובה"}
        <button type="submit">יצירת פרוייקט </button>
      </FormContainer>
    </ShellForForms>
  );
};
export default AddNewProject;

const Select = styled.select`
  font-size: 1rem;
  padding: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
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
  input[type="password"] {
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
