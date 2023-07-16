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
import { AllProjectData, idPrj } from "../atom/Atom";

import { useHistory } from "react-router-dom";

export interface IProps {
  _id: string;
  nameProject: string;
  staff: string;
  client: string;
  userId: string;
  statusProject: string;
  amountOfUsers: string;
}

const UpdateProject: React.FC<{
  onUpdate: IProps;
  openUpdate: boolean;
  projIndex: number;
}> = (props) => {
  // const [projId, setProjId] = useRecoilState(idPrj);
  const [isUpdate, setIsUpdate] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const [validUser, setValidUser] = useState("");
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isSucceed, setIsSucced] = useState(false);

  const [dataProject, setDataProject] = useRecoilState(AllProjectData);
  // const [isClose, setIsOpen] = useState<boolean>(props.openUpdate);

  let histury = useHistory();
  // const closeToUpdate = () => {
  //   return setIsClose(!props.openUpdate);
  // };

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
    height: "60%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  // useEffect(() => {
  //   reset({
  //     _id: dataProject[props.projIndex]._id,
  //     userId: dataProject[props.projIndex].userId,
  //     staff: dataProject[props.projIndex].staff,
  //     statusProject: dataProject[props.projIndex].statusProject,
  //     amountOfUsers: dataProject[props.projIndex].amountOfUsers,
  //     nameProject: dataProject[props.projIndex].nameProject,
  //     client: dataProject[props.projIndex].client,
  //   });
  // }, []);
  const editRejister: SubmitHandler<IProps> = async (data) => {
    setIsClick(true);
    setIsUpdate(!isUpdate);
    console.log(data);
    let user = "http://localhost:3001/api/routs/router/allUsers";
    await axios
      .get(user)
      .then((res) => {
        res.data.map(async (item: any) => {
          if (item.name === data.staff) {
            data.userId = item._id;
            let url = `http://localhost:3001/api/routs/router/updateProject`;
            await axios
              .put(url, data)
              .then((res) => {
                console.log(res.data);
                const index = dataProject.findIndex(
                  (obj) => obj._id === data._id
                );
                const updatedObject = {
                  ...dataProject[index],
                  amountOfUsers: data.amountOfUsers,
                  client: data.client,
                  _id: data._id,
                  nameProject: data.nameProject,
                  staff: data.staff,
                  statusProject: data.statusProject,
                  userId: data.userId,
                };

                const newArray: any = [
                  ...dataProject.slice(0, index),
                  updatedObject,
                  ...dataProject.slice(index + 1),
                ];

                setDataProject(newArray);
                setIsSucced(true);
              })
              .catch((err) => {
                console.log(err);
              });
            setIsUser(true);
            setOpen(false);
          } else {
            setValidUser("שם מפתח לא קיים");
          }
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // useEffect(() => {
  //   if (isSucceed) {
  //     histury.push("/projects");
  //   }
  // }, [isSucceed]);

  return (
    <Modal
      open={open}
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
              value={props.onUpdate.nameProject}
              {...register("nameProject", { required: true })}
            />
            {errors.nameProject && "שדה חובה"}
            <InputLabel htmlFor="my-input">שם המפתח</InputLabel>
            <Input
              id="my-input"
              aria-describedby="my-helper-text"
              type="text"
              value={props.onUpdate.staff}
              {...register("staff", { required: true })}
            />
            {!isUser && validUser}
            {errors.staff && "שדה חובה"}

            <InputLabel htmlFor="my-input">לקוח מוביל </InputLabel>
            <Input
              id="my-input"
              aria-describedby="my-helper-text"
              type="text"
              value={props.onUpdate.client}
              {...register("client", { required: true })}
            />
            {errors.client && "שדה חובה"}
            <InputLabel htmlFor="my-input"> האם יש משתמשים </InputLabel>
            <Input
              id="my-input"
              aria-describedby="my-helper-text"
              type="text"
              value={props.onUpdate.amountOfUsers}
              {...register("amountOfUsers", { required: true })}
            />
            {errors.amountOfUsers && "שדה חובה"}
            <br />
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="סטטוס"
              type="text"
              value={props.onUpdate.statusProject}
              // placeholder="סטטוס"
            >
              <MenuItem>{"פעיל"}</MenuItem>

              <MenuItem>{"לא פעיל"}</MenuItem>
            </Select>
            {errors.statusProject && "שדה חובה"}
            <br />
            <Button variant="contained" type="submit" color="success">
              שמירה
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setOpen(false);
              }}
            >
              ביטול
            </Button>
          </form>
        </Typography>
      </Box>
    </Modal>
  );
};
export default UpdateProject;
