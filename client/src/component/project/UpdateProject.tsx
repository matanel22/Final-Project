import {
  AppBar,
  Box,
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { idPrj } from "../atom/Atom";
import Card from "../UI/card";
export interface IProps {
  _id: string;
  nameProject: string;
  staff: string;
  client: string;
  userId: string;
  statusProject: string;
  amountOfUsers: string;
}
interface IUsers {
  _id: string;
  name: string;
  email: string;
  pass: string;
}
// interface IFormInputs {
//   _id: string;
//   nameProject: string;
//   client: string;
//   staff: string;
//   userId: string;
//   statusProject: string;
//   amountOfUsers: string;
// }
const UpdateProject: React.FC<{ onUpdate: IProps }> = (props) => {
  const [projId, setProjId] = useRecoilState(idPrj);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isUser, setIsUser] = useState(false);

  const option = ["פעיל ", "לא פעיל", "תחזוקה"];
  const {
    register,
    formState,
    formState: { errors, isDirty, isValid },
    handleSubmit,
    reset,
  } = useForm<IProps>({
    mode: "onChange",
  });

  useEffect(() => {
    reset({
      _id: props.onUpdate._id,
      userId: props.onUpdate.userId,
      staff: props.onUpdate.staff,
      statusProject: props.onUpdate.statusProject,
      amountOfUsers: props.onUpdate.amountOfUsers,
      nameProject: props.onUpdate.nameProject,
      client: props.onUpdate.client,
    });
  }, []);
  const editRejister: SubmitHandler<IProps> = async (data) => {
    let flag = false;
    setIsUpdate(!isUpdate);
    console.log(data);
    let u = "http://localhost:3001/api/routs/router/allUsers";
    await axios
      .get(u)
      .then((res) => {
        console.log(res.data[0]);
        res.data.map((item: any) => {
          if (item.name === data.staff) {
            data.userId = item._id;
            flag = true;
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
    setIsUpdate(!isUpdate);

    if (flag) {
      let url = `http://localhost:3001/api/routs/router/updateProject`;
      await axios
        .put(url, data)
        .then((res) => {
          console.log(res.data);
          setIsUser(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  let valideDev = !isUser ? <p>שם המפתח לא נמצא</p> : "";
  return (
    <Box
      sx={{
        position: "fixed",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 1,
        m: 1,
        bgcolor: "background.paper",
        borderRadius: 1,
      }}
    >
      <Card>
        <form onSubmit={handleSubmit(editRejister)}>
          <InputLabel htmlFor="my-input">שם פרוייקט </InputLabel>
          <Input
            id="my-input"
            aria-describedby="my-helper-text"
            type="text"
            // value={props.onUpdate.nameProject}
            {...register("nameProject", { required: true })}
          />
          <FormHelperText id="my-helper-text">
            We'll never share your nameProject.
          </FormHelperText>
          <InputLabel htmlFor="my-input">שם המפתח</InputLabel>
          <Input
            id="my-input"
            aria-describedby="my-helper-text"
            type="text"
            // value={props.onUpdate.staff}
            {...register("staff", { required: true })}
          />
          {valideDev}
          <FormHelperText id="my-helper-text">
            We'll never share your developer.
          </FormHelperText>
          <InputLabel htmlFor="my-input">לקוח מוביל </InputLabel>
          <Input
            id="my-input"
            aria-describedby="my-helper-text"
            type="text"
            // value={props.onUpdate.client}
            {...register("client", { required: true })}
          />
          <FormHelperText id="my-helper-text">
            We'll never share your client.
          </FormHelperText>
          <InputLabel htmlFor="my-input"> האם יש משתמשים </InputLabel>
          <Input
            id="my-input"
            aria-describedby="my-helper-text"
            type="text"
            {...register("amountOfUsers", { required: true })}
          />
          <FormHelperText id="my-helper-text">
            We'll never share your amountOfUsers.
          </FormHelperText>
          {/* <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            type="text"
            {...register("statusProject", { required: true })}
          >
            {errors.statusProject && "חובה  לבחור "}
            <MenuItem>פעיל</MenuItem>
            <MenuItem>לא פעיל</MenuItem>
            <MenuItem>תחזוקה</MenuItem>
          </Select>
          <FormHelperText id="my-helper-text">
            We'll never share your statusProject.
          </FormHelperText> */}

          <Button variant="contained" type="submit" color="success">
            {" "}
            עדכן
          </Button>
        </form>
      </Card>
    </Box>
  );
};
export default UpdateProject;
// : React.FC<{ editProj: IProps }>
