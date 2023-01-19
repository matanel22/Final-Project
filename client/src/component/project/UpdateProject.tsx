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

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { idPrj } from "../atom/Atom";
import Card from "../UI/card";
import { useHistory } from "react-router-dom";
import classes from "./update.module.css";
export interface IProps {
  _id: string;
  nameProject: string;
  staff: string;
  client: string;
  userId: string;
  statusProject: string;
  amountOfUsers: string;
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
const UpdateProject: React.FC<{ onUpdate: IProps; openUpdate: boolean }> = (
  props
) => {
  // const [projId, setProjId] = useRecoilState(idPrj);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isSucceed, setIsSucced] = useState(false);
  // const [isClose, setIsOpen] = useState<boolean>(props.openUpdate);

  let histury = useHistory();
  // const closeToUpdate = () => {
  //   return setIsClose(!props.openUpdate);
  // };
  const option = ["פעיל ", "לא פעיל"];
  const {
    register,
    formState,
    formState: { errors, isDirty, isValid },
    handleSubmit,
    reset,
  } = useForm<IProps>({
    mode: "onChange",
  });
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

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
    setIsClick(true);
    let flag = false;
    setIsUpdate(!isUpdate);
    console.log(data);
    let u = "http://localhost:3001/api/routs/router/allUsers";
    await axios
      .get(u)
      .then((res) => {
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
      setIsUser(true);
      let url = `http://localhost:3001/api/routs/router/updateProject`;
      await axios
        .put(url, data)
        .then((res) => {
          setIsSucced(true);
          console.log(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  // useEffect(() => {
  //   if (isSucceed) {
  //     histury.push("/projects");
  //   }
  // }, [isSucceed]);
  let valideDev = isClick && !isUser ? <p>שם המפתח לא נמצא</p> : "";
  return (
    <Card>
      {/* <Button className={classes.btn} onClick={handleOpen}>
        {" "}
        עדכון
      </Button> */}
      <Modal
        open={props.openUpdate}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClose={handleClose}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <form onSubmit={handleSubmit(editRejister)}>
              <InputLabel htmlFor="my-input">שם פרוייקט </InputLabel>
              <Input
                id="my-input"
                aria-describedby="my-helper-text"
                type="text"
                // value={props.onUpdate.nameProject}
                {...register("nameProject", { required: true })}
              />

              <InputLabel htmlFor="my-input">שם המפתח</InputLabel>
              <Input
                id="my-input"
                aria-describedby="my-helper-text"
                type="text"
                // value={props.onUpdate.staff}
                {...register("staff", { required: true })}
              />
              {valideDev}

              <InputLabel htmlFor="my-input">לקוח מוביל </InputLabel>
              <Input
                id="my-input"
                aria-describedby="my-helper-text"
                type="text"
                // value={props.onUpdate.client}
                {...register("client", { required: true })}
              />

              <InputLabel htmlFor="my-input"> האם יש משתמשים </InputLabel>
              <Input
                id="my-input"
                aria-describedby="my-helper-text"
                type="text"
                {...register("amountOfUsers", { required: true })}
              />

              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                label="סטטוס"
                type="text"
                // placeholder="סטטוס"
                {...register("statusProject", { required: true })}
              >
                {option.map((item, index) => {
                  return <MenuItem>{item}</MenuItem>;
                })}
              </Select>

              <Button variant="contained" type="submit" color="success">
                {" "}
                שמירה
              </Button>
              {/* <Button
                variant="contained"
                type="submit"
                color="success"
                onClick={closeToUpdate}
              >
                סגור
              </Button> */}
            </form>
          </Typography>
        </Box>
      </Modal>
    </Card>
  );
};
export default UpdateProject;
// : React.FC<{ editProj: IProps }>
