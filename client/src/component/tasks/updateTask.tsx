import {
  AppBar,
  Box,
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  MenuItem,
  Modal,
  Select,
  Typography,
} from "@mui/material";
import axios from "axios";
import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import TasksData, { idPrj } from "../atom/Atom";
import Card from "../UI/card";
interface IFormMission {
  _id: String;
  discrption: String;
  missionStatus: String;
  projectId: String;
  date_created: string;
  endDate: string;
  remarks: String;
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
const UpdateTask: React.FC<{
  onMission: IFormMission;
  indexMission: number;
}> = (props) => {
  const [mis, setMis] = useRecoilState(TasksData);
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {
    register,
    formState,
    formState: { errors, isDirty, isValid },
    handleSubmit,
    reset,
  } = useForm<IFormMission>({
    mode: "onChange",
  });
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",

    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  useEffect(() => {
    reset({
      _id: mis[props.indexMission]._id,
      discrption: mis[props.indexMission].discrption,
      missionStatus: mis[props.indexMission].missionStatus,
      projectId: mis[props.indexMission].projectId,
      date_created: dayjs(mis[props.indexMission].date_created)
        .format("DD/MM/YYYY")
        .toString(),
      endDate: dayjs(mis[props.indexMission].endDate)
        .format("DD/MM/YYYY")
        .toString(),
      remarks: mis[props.indexMission].remarks,
    });
    console.log(dayjs(mis[props.indexMission].endDate));
  }, []);
  const editRejister: SubmitHandler<IFormMission> = async (data) => {
    data._id = mis[props.indexMission]._id;
    data.projectId = mis[props.indexMission].projectId;

    let url = `http://localhost:3001/api/routs/router/updateMission`;

    await axios
      .put(url, data)
      .then((res) => {
        console.log(res.data);
        const index = mis.findIndex((obj) => obj._id === data._id);
        const updatedObject = {
          ...mis[index],
          discrption: data.discrption,
          missionStatus: data.missionStatus,
          _id: data._id,
          projectId: data.projectId,
          date_created: data.date_created,
          endDate: data.endDate,
          remarks: data.remarks,
        };

        const newArray: any = [
          ...mis.slice(0, index),
          updatedObject,
          ...mis.slice(index + 1),
        ];

        setMis(newArray);
      })
      .catch((err) => {
        console.log(err);
      });
    setOpen(false);
  };
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
            <InputLabel htmlFor="my-input"> תיאור המשימה </InputLabel>
            <Input
              id="my-input"
              aria-describedby="my-helper-text"
              type="text"
              {...register("discrption", { required: true })}
            />
            {errors.discrption && "שדה חובה"}
            <InputLabel htmlFor="my-input"> סטטוס משימה</InputLabel>
            <Input
              id="my-input"
              aria-describedby="my-helper-text"
              type="text"
              {...register("missionStatus", { required: true })}
            />
            {errors.missionStatus && "שדה חובה"}
            <InputLabel htmlFor="my-input">תאריך התחלה </InputLabel>
            <Input
              id="my-input"
              aria-describedby="my-helper-text"
              type="date"
              {...register("date_created", { required: true })}
            />
            {errors.date_created && "שדה חובה"}
            <InputLabel htmlFor="my-input"> תאריך סיום </InputLabel>
            <Input
              id="my-input"
              aria-describedby="my-helper-text"
              type="date"
              {...register("endDate", { required: true })}
            />
            {errors.endDate && "שדה חובה"}
            {/* <FormHelperText id="my-helper-text">
            We'll never share your client.
          </FormHelperText> */}
            <InputLabel htmlFor="my-input"> הערות </InputLabel>
            <Input
              id="my-input"
              aria-describedby="my-helper-text"
              type="text"
              {...register("remarks", { required: true })}
            />

            <Button variant="contained" type="submit" color="success">
              {" "}
              עדכן
            </Button>
          </form>
        </Typography>
      </Box>
    </Modal>
  );
};
export default UpdateTask;
