import {
  AppBar,
  Button,
  Container,
  CssBaseline,
  IconButton,
  TextareaAutosize,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import styled from "styled-components";
import { Box } from "@mui/system";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Link, useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import TasksData, { idPrj, missionProj, userName } from "../atom/Atom";
// import ButtonMisson from "../UI/Button";
import Card from "../UI/card";
import classes from "./CreateTasks.module.css";
import { log } from "util";

interface IFormMission {
  _id: String;
  discrption: String;
  missionStatus: String;
  projectId: String;
  date_created: Date;

  endDate: Date;
  remarks: String;
}
const CreateTasks = () => {
  const [ID, setId] = useRecoilState(idPrj);
  const [dataMission, setDataMission] = useRecoilState(missionProj);
  const [isMission, setIsMission] = useRecoilState(TasksData);

  let histury = useHistory();
  const {
    register,
    formState,
    formState: { errors, isDirty, isValid },
    handleSubmit,
  } = useForm<IFormMission>({
    mode: "onChange",
    defaultValues: {},
  });

  const registerPrj: SubmitHandler<IFormMission> = async (data) => {
    data.projectId = ID;
    let url = "http://localhost:3001/api/routs/router/creatMission";
    await axios
      .post(url, data)

      .then((res) => {
        setDataMission(res.data);
        console.log(res.data);

        histury.push("tasks/" + data.projectId);
      })
      .catch((res) => {
        console.log("res", res);
      });
  };
  // useEffect(() => {
  //   if (isSucceed) {
  //     histury.push("tasks");
  //   }
  // }, [isSucceed]);
  return (
    <FormContainer onSubmit={handleSubmit(registerPrj)}>
      <label> תיאור המשימה </label>
      <input
        {...register("discrption", { required: true })}
        placeholder="תיאור המשימה "
        type="text"
        // style={{ width: 250, height: 100 }}
      />

      {errors.discrption && " זהו שדה חובה  "}

      <input
        {...(register("projectId"), { required: true })}
        type="hidden"
        value={ID}
      />
      <label> סטטוס משימה </label>
      <input
        {...register("missionStatus", { required: true })}
        type="text"
        placeholder="סטטוס משימה "
      />

      {errors.missionStatus && "זהו שדה חובה "}

      <label> תאריך התחלה </label>
      <input
        id="date_created"
        {...register("date_created", { required: true })}
        type="date"
        placeholder="תאריך התחלה "
      />

      {errors.date_created && "זהו שדה חובה "}

      <label>תאריך סיום </label>
      <input
        id="endDate"
        {...register("endDate", { required: true })}
        type="date"
        placeholder="תאריך סיום "
      />

      {errors.endDate && "זהו שדה חובה "}

      <label> הערות </label>
      <input
        {...register("remarks")}
        placeholder="תיאור המשימה "
        style={{ width: 250, height: 100 }}
        type="text"
      />

      <button type="submit">סיום </button>
    </FormContainer>
    //   </Box>
    // </div>
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
  background-color: #f2f2f2;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  margin: 0 auto;
  margin-top: 50px;
  max-width: 50%;
  h2 {
    margin-bottom: 20px;
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
    margin-top: 20%;
    &:hover {
      background-color: #449d44;
    }
  }
`;
