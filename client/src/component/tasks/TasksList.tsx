import {
  AppBar,
  Button,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Toolbar,
  Typography,
} from "@mui/material";
import * as dayjs from "dayjs";
import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import TasksData, { idPrj } from "../atom/Atom";
// import ButtonMisson from "../UI/Button";
import Card from "../UI/card";
import CreateTasks from "./createTasks";
import { Box } from "@mui/system";
import UpdateTask from "./updateTask";

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

// : React.FC<{ onShowMission: IFormMission[] }
const TasksList = () => {
  const [ID, setId] = useRecoilState(idPrj);
  const [mis, setMis] = useRecoilState(TasksData);
  const [isOpen, setIsOpen] = useState(false);
  const [taskOne, setTaskOne] = useState<IFormMission>(Object);
  const [isOpenEditTask, setIsOpenEditTask] = useState(false);
  const sendingToTheCreation = () => {
    setIsOpen(!isOpen);
  };
  const showEditTask = async (id: string) => {
    let url = "http://localhost:3001/api/routs/router/taskOne";
    await axios.post(url, { id }).then((res) => {
      console.log(res.data);
      setTaskOne(res.data);
    });
    setIsOpenEditTask(!isOpenEditTask);
  };
  const removeMission = (id: string) => {
    let url = `http://localhost:3001/api/routs/router/deleteSpcificMission/${id}`;
    axios
      .delete(url)
      .then((response) => {
        console.log(response);
        let url = "http://localhost:3001/api/routs/router/allMissionOfProject";
        axios.post(url, ID).then((res) => {
          setMis(res.data);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    const sendProjectID = (id: string) => {
      let url = "http://localhost:3001/api/routs/router/allMissionOfProject";
      axios
        .post(url, { id })
        .then((res) => {
          console.log(res.data);
          setMis(res.data);
        })
        .catch((res) => {
          console.log(res);
        });
    };
    sendProjectID(ID);
  }, []);

  let validtasks =
    mis.length === 0 ? <h1>אין משימות בפרוייקט זה</h1> : <h1>משימות</h1>;
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
              News
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
                הפרוייקטים של המדור
              </Button>
            </Link>
            ;{/* <Button color="inherit">Login</Button> */}
          </Toolbar>
        </AppBar>
      </Box>
      <TableHead>
        {validtasks}
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: 700 }} aria-label="customized table">
            <TableHead>
              <TableRow>
                <TableCell>Dessert (100g serving)</TableCell>
                <TableCell align="right">תיאור המשימה</TableCell>
                <TableCell align="right">סטטוס משימה</TableCell>
                <TableCell align="right">תאריך התחלה</TableCell>
                <TableCell align="right"> עד תאריך </TableCell>
                <TableCell align="right">הערות </TableCell>
                <TableCell align="right">למחיקת משימה </TableCell>
                <TableCell align="right">לעדכון משימה </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mis.length > 0 &&
                mis.map((item: any, index) => (
                  <TableRow key={index}>
                    <TableCell component="th" scope="row">
                      {/* {item.name} */}
                    </TableCell>
                    <TableCell align="right">{`תיאור:${item.discrption}`}</TableCell>
                    <TableCell align="right">{item.missionStatus}</TableCell>
                    <TableCell align="right">{item.date_created}</TableCell>
                    <TableCell align="right">{item.endDate}</TableCell>
                    <TableCell align="right">{item.remarks}</TableCell>
                    <TableCell align="right">
                      {" "}
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => {
                          removeMission(item._id);
                        }}
                      >
                        Delete
                      </Button>
                    </TableCell>
                    <TableCell align="right">
                      {" "}
                      <Button
                        variant="outlined"
                        color="success"
                        onClick={() => {
                          showEditTask(item._id);
                        }}
                      >
                        עדכון משימה
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>

        <Link to="createTasks">
          <Button
            variant="outlined"
            color="secondary"
            onClick={sendingToTheCreation}
          >
            ליצירת משימה חדשה
          </Button>
        </Link>
        {isOpen && <CreateTasks></CreateTasks>}
      </TableHead>
      {isOpenEditTask && <UpdateTask onMission={taskOne}></UpdateTask>}
    </div>
  );
};
export default TasksList;

// {`שם:${item.nameProject}`}
// {`מפתח:${item.staff}`}
