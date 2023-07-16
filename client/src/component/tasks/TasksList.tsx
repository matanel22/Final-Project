import {
  AppBar,
  Button,
  IconButton,
  Modal,
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
import { Link, useParams } from "react-router-dom";
import { useRecoilState } from "recoil";
import TasksData, { idPrj, userName } from "../atom/Atom";
// import ButtonMisson from "../UI/Button";
import Card from "../UI/card";
import CreateTasks from "./createTasks";
import { Box } from "@mui/system";
import UpdateTask from "./updateTask";
import { UrlTask } from "./urlTask";
import PageLoader from "../Loading/Loading";
import styled, { css } from "styled-components";
import { blue } from "@mui/material/colors";
import { NavButton } from "../UI/NavButton";
import { MyObject } from "../project/AllProjects";
interface IFormMission {
  _id: String;
  discrption: String;
  missionStatus: String;
  projectId: String;
  // dayjs: () => {};
  date_created: string;
  endDate: string;
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
  const [isIndex, setIsIndex] = useState(0);
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);
  const [openModal, setOpenModal] = useState(false);
  const PID: MyObject = useParams();
  let flag = true;
  const sendingToTheCreation = () => {
    setIsOpen(!isOpen);
  };
  const showEditTask = async (_id: string, index: number) => {
    setIsIndex(index);
    let url = "http://localhost:3001/api/routs/router/taskOne";
    await axios.post(url, { _id }).then((res) => {
      console.log(res.data);
      setTaskOne(res.data);
    });
    setIsOpenEditTask(!isOpenEditTask);
  };
  const removeMission = async (id: string) => {
    let url = `http://localhost:3001/api/routs/router/deleteSpcificMission/${id}`;
    const missionDelete = mis.filter((item) => {
      return item._id !== id;
    });
    setMis(missionDelete);
    await axios
      .delete(url)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    const sendProjectID = async (id: string) => {
      let url = "http://localhost:3001/api/routs/router/allMissionOfProject";
      await axios
        .post(url, { id })
        .then((res) => {
          console.log(res.data);
          setMis(res.data);
        })
        .catch((res) => {
          console.log(res);
        });
    };
    sendProjectID(PID.id);
  }, []);

  const color = blue[100];
  return (
    <>
      <AppBar
        sx={{
          flexGrow: 1,
          minHeight: 100,
        }}
        position="static"
      >
        {/* <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="menu"
          sx={{ mr: 2 }}
        ></IconButton> */}
        {/* <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {NU}
        </Typography> */}
        <ButoonNav>
          <Link to="/projects">
            <Button
              color="success"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              {/* <Icon color="primary">add_circle</Icon> */}
              הפרוייקטים של המדור
            </Button>
          </Link>
          <Link to="/createTasks">
            <Button
              variant="contained"
              color="success"
              sx={{ mt: 3, mb: 2 }}
              onClick={sendingToTheCreation}
            >
              ליצירת משימה חדשה
            </Button>
          </Link>
        </ButoonNav>
        {/* <Button color="inherit">Login</Button> */}
      </AppBar>
      <PageLoader>{}</PageLoader>
      <WidthTable>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow sx={{ bgcolor: color }}>
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
                    <TableCell align="right">{`תיאור:${item.discrption}`}</TableCell>
                    <TableCell align="right">{item.missionStatus}</TableCell>
                    <TableCell align="right">
                      {dayjs(item.date_created)
                        .format("DD/MM/YYYY")
                        .toString()}
                    </TableCell>
                    <TableCell align="right">
                      {dayjs(item.endDate)
                        .format("DD/MM/YYYY")
                        .toString()}
                    </TableCell>
                    <TableCell align="right">{item.remarks}</TableCell>
                    <TableCell align="right">
                      {" "}
                      <Button
                        variant="outlined"
                        color="error"
                        onClick={() => {
                          setOpenModal(true);
                        }}
                      >
                        מחיקת משימה
                      </Button>
                      {openModal && (
                        <Modal
                          open={openModal}
                          aria-labelledby="modal-modal-title"
                          aria-describedby="modal-modal-description"
                          onClose={handleClose}
                        >
                          <div>
                            <p> ברצונך להתנתק</p>
                            <Button
                              variant="outlined"
                              color="success"
                              onClick={() => {
                                removeMission(item._id);
                                setOpenModal(false);
                              }}
                            >
                              כן
                            </Button>
                            <Button
                              variant="outlined"
                              color="error"
                              onClick={() => {
                                setOpenModal(false);
                              }}
                            >
                              לא
                            </Button>
                          </div>
                        </Modal>
                      )}
                      {/* <Button
                        variant="outlined"
                        color="error"
                        onClick={() => {
                          removeMission(item._id);
                        }}
                      >
                       כן
                      </Button> */}
                    </TableCell>
                    <TableCell align="right">
                      {" "}
                      <Button
                        variant="outlined"
                        color="success"
                        onClick={() => {
                          showEditTask(item._id, index);
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
        <UrlTask />
        {isOpen && <CreateTasks />}

        {isOpenEditTask && (
          <UpdateTask onMission={taskOne} indexMission={isIndex}></UpdateTask>
        )}
      </WidthTable>
      {/* <UrlTask /> */}
    </>
  );
};
export default TasksList;

export const ButoonNav = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const WidthTable = styled.div`
  margin: 0 auto;
  margin-top: 1%;
  width: 90vw;
`;
