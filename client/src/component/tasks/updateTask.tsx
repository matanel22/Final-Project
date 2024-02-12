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
  Typography,
} from "@mui/material";
import styled from "styled-components";
import axios from "axios";
import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import TasksData from "../atom/Atom";

import { StatusMission } from "./StatusMission";
import { IFormMission } from "./TasksList";
import SuccessMessage from "../MessegeToUser";
import ButtonLoading from "../UI/ButtonLoadung";
interface TASK {
  name: string;
  type: any;
  register: any;
  discrption?: string;
}
export const MISSION_UPDATE: TASK[] = [
  {
    name: "תיאור המשימה",
    type: "text",
    register: "discrption",
  },
  // {
  //   name: "סטטוס משימה",
  //   type: "text",
  //   register: "statusId",
  // },
  {
    name: "תאריך התחלה",
    type: "date",
    register: "date_created",
  },
  {
    name: "תאריך סיום",
    type: "date",
    register: "endDate",
  },
  // {
  //   name: "הערות",
  //   type: "text",
  //   register: "remarks",
  // },
];

const UpdateTask: React.FC<{
  onMission: IFormMission;
  indexMission: number;
}> = (props) => {
  const [mis, setMis] = useRecoilState(TasksData);
  const [open, setOpen] = React.useState(true);
  const [errorDate, setErrorDate] = useState("");
  const [successCration, setSuccessCration] = useState(false);

  const handleClose = () => setOpen(false);
  const {
    register,
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
      // id: props.onMission.id,
      discrption: props.onMission.discrption,
      statusId: props.onMission.statusId,
      projectId: props.onMission.projectId,
      date_created: props.onMission.date_created,
      endDate: props.onMission.endDate,
      remarks: props.onMission.remarks,
    });
  }, []);
  const editRejister: SubmitHandler<IFormMission> = async (data) => {
    if (new Date(data.endDate) < new Date(data.date_created)) {
      setErrorDate("שדה סיום גדול מתאריך התחלה");
      return;
    } else {
      setErrorDate("");
    }
    data.id = mis[props.indexMission].id;
    data.projectId = props.onMission.projectId;

    let url = `http://localhost:3001/api/routs/router/updateMission`;

    await axios
      .put(url, data)
      .then((res) => {
        setSuccessCration(true);
        const index = mis.findIndex((obj) => obj.id === data.id);
        const updatedObject = {
          ...mis[index],
          discrption: data.discrption,
          statusId: data.statusId,
          id: data.id,
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
  //value={props.onMission.statusId}
  return (
    <>
      {successCration && (
        <SuccessMessage
          message="המשימה עודכנה בהצלחה"
          setSuccessCration={setSuccessCration}
          successCration={successCration}
          url={`/tasks/${props.onMission.projectId}`}
          typeAlert="success"
        />
      )}
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClose={handleClose}
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <form onSubmit={handleSubmit(editRejister)}>
              {MISSION_UPDATE.map((item, index) => {
                return (
                  <>
                    <InputLabel htmlFor="my-input"> {item.name}</InputLabel>
                    <Input
                      id="my-input"
                      aria-describedby="my-helper-text"
                      type={item.type}
                      // value={props.onMission.discrption}
                      {...register(item.register, { required: true })}
                    />
                    {(errors.discrption ||
                      errors.date_created ||
                      errors.endDate ||
                      errors.taskType) &&
                      "שדה חובה"}
                  </>
                );
              })}

              <InputLabel htmlFor="my-input">סטטוס משימה</InputLabel>
              <Select
                id="my-input"
                aria-describedby="my-helper-text"
                {...register("statusId", { required: true })}
              >
                {StatusMission.map((item, i) => {
                  return <option key={i}>{item.name}</option>;
                })}
              </Select>
              {errors.statusId && "שדה חובה"}

              <ButtonLoading textButton="עדכן" />
            </form>
          </Typography>
        </Box>
      </Modal>
    </>
  );
};
export default UpdateTask;
export const Select = styled.select`
  width: 75%;
  padding: 10px;
  margin-bottom: 20px;
  border: none;
  border-radius: 5px;
  background-color: #e0e0e0;
`;
