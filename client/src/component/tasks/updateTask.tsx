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
import React, { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { idPrj } from "../atom/Atom";
import Card from "../UI/card";
interface IFormMission {
  _id: String;
  discrption: String;
  missionStatus: String;
  projectId: String;
  // dayjs: () => {};
  data_created: {
    type: Date;
  };
  endDate: { type: Date };
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
const UpdateTask: React.FC<{ onMission: IFormMission }> = (props) => {
  const option = ["פעיל ", "לא פעיל"];
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
    width: 400,
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  useEffect(() => {
    reset({
      _id: props.onMission._id,
      discrption: props.onMission.discrption,
      missionStatus: props.onMission.missionStatus,
      projectId: props.onMission.projectId,
      data_created: props.onMission.data_created,
      endDate: props.onMission.endDate,
      remarks: props.onMission.remarks,
    });
    console.log(props.onMission.discrption);
  }, []);
  const editRejister: SubmitHandler<IFormMission> = async (data) => {
    data._id = props.onMission._id;
    data.projectId = props.onMission.projectId;

    let url = `http://localhost:3001/api/routs/router/updateMission`;
    await axios
      .put(url, data)
      .then((res) => {
        console.log(res.data);
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
              {...register("data_created", { required: true })}
            />
            {errors.data_created && "שדה חובה"}
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
