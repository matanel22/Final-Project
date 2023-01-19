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
  const [isSucceed, setIsSucced] = useState(false);
  const [NY, setNameUser] = useRecoilState<string>(userName);
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
    axios
      .post(url, data)

      .then((res) => {
        setDataMission(res.data);
        histury.push("tasks");
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
    <div>
      <Box sx={{ flexGrow: 1, minHeight: 150 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            ></IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              {NY}
            </Typography>
            <Link to="/projects">
              <Button
                color="secondary"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {/* <Icon color="primary">add_circle</Icon> */}
                לפרוייקטים
              </Button>
            </Link>
            ;{/* <Button color="inherit">Login</Button> */}
          </Toolbar>
        </AppBar>
      </Box>
      <CssBaseline />
      <Container fixed>
        <Box sx={{ bgcolor: "#cfe8fc", height: "70vh" }}>
          <form onSubmit={handleSubmit(registerPrj)}>
            <label> תיאור המשימה </label>
            <TextareaAutosize
              {...register("discrption", { required: true })}
              placeholder="תיאור המשימה "
              style={{ width: 250, height: 100 }}
            />
            <br />
            {errors.discrption && " זהו שדה חובה  "}
            <br />
            <TextField
              size="small"
              {...(register("projectId"), { required: true })}
              type="hidden"
              value={ID}
            />
            <label> סטטוס משימה </label>
            <TextField
              size="small"
              {...register("missionStatus", { required: true })}
              type="text"
              placeholder="סטטוס משימה "
            />
            <br />
            {errors.missionStatus && "זהו שדה חובה "}
            <br />
            <label> תאריך התחלה </label>
            <TextField
              id="date_created"
              size="small"
              {...register("date_created", { required: true })}
              type="date"
              placeholder="תאריך התחלה "
            />
            <br />
            {errors.date_created && "זהו שדה חובה "}
            <br />
            <label>תאריך סיום </label>
            <TextField
              id="endDate"
              size="small"
              {...register("endDate", { required: true })}
              type="date"
              placeholder="תאריך סיום "
            />
            <br />
            {errors.endDate && "זהו שדה חובה "}
            <br />
            <label> הערות </label>
            <TextareaAutosize
              {...register("remarks")}
              placeholder="תיאור המשימה "
              style={{ width: 250, height: 100 }}
            />

            <Button variant="contained" type="submit">
              סיום{" "}
            </Button>
          </form>
        </Box>
      </Container>
    </div>
  );
};
export default CreateTasks;
