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
import dayjs from "dayjs";
import React, { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import TasksData, { idPrj, userName } from "../atom/Atom";
// import ButtonMisson from "../UI/Button";
import Card from "../UI/card";
import CreateTasks from "./createTasks";
import { Box } from "@mui/system";
import UpdateTask from "./updateTask";
import UrlTask from "./urlTask";

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
// useEffect(() => {
//   let url =
//     "https://quickchart.io/sandbox/#%7B%22chart%22%3A%22%7B%5Cn%20%20type%3A%20'radialGauge'%2C%5Cn%20%20data%3A%20%7B%5Cn%20%20%20%20datasets%3A%20%5B%7B%5Cn%20%20%20%20%20%20data%3A%20%5B80%5D%2C%5Cn%20%20%20%20%20%20backgroundColor%3A%20getGradientFillHelper('horizontal'%2C%20%5B'red'%2C%20'blue'%5D)%2C%5Cn%20%20%20%20%7D%5D%5Cn%20%20%7D%2C%5Cn%20%20options%3A%20%7B%5Cn%20%20%20%20%2F%2F%20See%20https%3A%2F%2Fgithub.com%2Fpandameister%2Fchartjs-chart-radial-gauge%23options%5Cn%20%20%20%20domain%3A%20%5B0%2C%20100%5D%2C%5Cn%20%20%20%20trackColor%3A%20'%23f0f8ff'%2C%20%5Cn%20%20%20%20centerPercentage%3A%2090%2C%5Cn%20%20%20%20centerArea%3A%20%7B%5Cn%20%20%20%20%20%20text%3A%20(val)%20%3D%3E%20val%20%2B%20'%25'%2C%5Cn%20%20%20%20%7D%2C%5Cn%20%20%7D%5Cn%7D%22%2C%22width%22%3A500%2C%22height%22%3A300%2C%22version%22%3A%222%22%2C%22backgroundColor%22%3A%22%23fff%22%7D";
//   axios.get(url).then((res) => {
//     console.log(res.data);
//   });
// });

// : React.FC<{ onShowMission: IFormMission[] }

const TasksList = () => {
  const [ID, setId] = useRecoilState(idPrj);
  const [mis, setMis] = useRecoilState(TasksData);
  const [isOpen, setIsOpen] = useState(false);
  const [taskOne, setTaskOne] = useState<IFormMission>(Object);
  const [isOpenEditTask, setIsOpenEditTask] = useState(false);
  const [NU, setNameUser] = useRecoilState<string>(userName);
  const [isOpenApi, setIsOpenApi] = useState(false);
  const sendingToTheCreation = () => {
    setIsOpen(!isOpen);
  };
  const showEditTask = async (_id: string) => {
    let url = "http://localhost:3001/api/routs/router/taskOne";
    await axios.post(url, { _id }).then((res) => {
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
              {NU}
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
            <Link to="createTasks">
              <Button
                variant="contained"
                color="secondary"
                sx={{ mt: 3, mb: 2 }}
                onClick={sendingToTheCreation}
              >
                ליצירת משימה חדשה
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
                <TableCell align="right">הערות</TableCell>
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
                    <TableCell align="right">
                      {dayjs(item.date_created)
                        .format("DD/MM/YYYY")
                        .toString()}
                    </TableCell>
                    <TableCell align="right">
                      {dayjs(item.endDate).format("DD/MM/YYYY")}
                    </TableCell>
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
                        מחיקת משימה
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

        {isOpen && <CreateTasks></CreateTasks>}
      </TableHead>
      {isOpenEditTask && <UpdateTask onMission={taskOne}></UpdateTask>}
      <UrlTask />
    </div>
  );
};
export default TasksList;

// {`שם:${item.nameProject}`}
// {`מפתח:${item.staff}`}
