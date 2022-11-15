import React, { useState, useRef, useEffect, FormEvent } from "react";
import Button from "../UI/Button";
import classes from "./AddNewProject.module.css";
import Card from "../UI/card";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";
// "name": "בטיחות",
// "developer": "ליאל",
// "client": "מלמ",
// "maintenaceMode
interface IFormInputs {
  nameProject: string;
  client: string;
  staff: string;
  statusProject: string;
}

const AddNewProject: React.FC = (props) => {
  const {
    register,
    formState,
    formState: { errors, isDirty, isValid },
    handleSubmit,
  } = useForm<IFormInputs>({
    mode: "onChange",
    defaultValues: {
      nameProject: "",
      client: "",
      staff: "",
    },
  });
  console.log("isValid", isValid);
  // useEffect(() => {
  //   let h1 = <h1>הפרוייקט נוצר בהצלחה</h1>;
  // }, [isValid]);
  const registerPrj: SubmitHandler<IFormInputs> = async (data) => {
    let url = "http://localhost:3001/api/routs/router/addCreatProject";
    axios
      .post(url, data)
      .then(({ data }) => {
        console.log(data);
      })
      .catch((res) => {
        console.log("res", res);
      });
  };
  return (
    <Card className={classes.AddNewProject}>
      <form onSubmit={handleSubmit(registerPrj)}>
        <label>שם פרוייקט</label>
        <input
          {...register("nameProject", { required: true })}
          type="text"
          placeholder="שם פרוייקט"
        />
        <br />
        {errors.nameProject && "חובה למלא שם פרוייקט"}
        <br />
        <label>שם הצוות </label>
        <input
          {...register("staff", { required: true })}
          type="text"
          placeholder="שם הצוות"
        />
        <br />
        {errors.staff && "חובה למלא שם צוות"}
        <br />
        <label>שם לקוח</label>
        <input
          {...register("client", { required: true })}
          type="text"
          placeholder="שם לקוח"
        />
        <br />
        {errors.client && "חובה למלא שם לקוח"}
        <br />
        <label>פרוייקט סטטוס</label>
        <select {...register("statusProject", { required: true })}>
          <option>יש לבחור</option>
          <option>פעיל</option>
          <option>תחזוקה</option>
          <option>לא פעיל</option>
        </select>
        <br />

        <Button type="submit">יצירת פרוייקט</Button>
        <Link to="/projects">
          <Button>כל פרוייקטים</Button>
        </Link>
      </form>
    </Card>
  );
};

export default AddNewProject;
