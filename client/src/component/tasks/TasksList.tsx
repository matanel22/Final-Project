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
import TasksData, { idPrj, userId, userName } from "../atom/Atom";
// import ButtonMisson from "../UI/Button";

import CreateTasks from "./createTasks";

import UpdateTask from "./updateTask";
import { UrlTask } from "./urlTask";
import PageLoader from "../Loading/Loading";
import styled, { css } from "styled-components";
import { blue } from "@mui/material/colors";

import duonArrow from "../../svg/downArrow.svg";
import { MyObject } from "../project/AllProjects";

interface IFormMission {
  id: String;
  discrption: String;
  statusId: String;
  projectId: String;
  date_created: string;
  endDate: string;
  remarks: String;
}
interface Open {
  stap: boolean;
  openIndex: number;
}
const TITALE_MISSIONS = [
  { title: "תיאור המשימה" },
  { title: "סטטוס משימה" },
  { title: "תאריך התחלה" },
  { title: "עד תאריך" },
  { title: "הערות" },
];

const TasksList = () => {
  const [mis, setMis] = useRecoilState(TasksData);

  const [isOpen, setIsOpen] = useState<Open>({ stap: false, openIndex: 0 });
  const [taskOne, setTaskOne] = useState<IFormMission>(Object);
  const [isOpenEditTask, setIsOpenEditTask] = useState(false);
  const [isIndex, setIsIndex] = useState(0);
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);
  const [openModal, setOpenModal] = useState(false);
  const [useId, setUseId] = useRecoilState<string>(userId);
  const PID: MyObject = useParams();

  const sendingToTheCreation = (index: number) => {
    setIsOpen({ ...isOpen, stap: !isOpen.stap, openIndex: index });
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
  const removeMission = async (_id: string) => {
    console.log(_id);

    let url = `http://localhost:3001/api/routs/router/deleteSpcificMission/${_id}`;

    await axios
      .delete(url)
      .then((response) => {
        const missionDelete = mis.filter((item) => {
          return item._id !== _id;
        });
        setMis(missionDelete);
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
        .catch((err) => {
          console.log(err);
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
        <ButoonNav>
          <Link to={`/projects/${useId}`}>
            <Button
              color="success"
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              הפרוייקטים של המדור
            </Button>
          </Link>
          <Link to="/createTasks">
            <Button
              variant="contained"
              color="success"
              sx={{ mt: 3, mb: 2 }}
              // onClick={sendingToTheCreation}
            >
              ליצירת משימה חדשה
            </Button>
          </Link>
        </ButoonNav>
      </AppBar>
      <PageLoader>{}</PageLoader>
      <WidthTable>
        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              <TableRow sx={{ bgcolor: color }}>
                {TITALE_MISSIONS.map((item, index) => {
                  return (
                    <TableCell align="right" key={index}>
                      {item.title}
                    </TableCell>
                  );
                })}
              </TableRow>
            </TableHead>
            <TableBody>
              {mis.length > 0 &&
                mis.map((item: any, index) => (
                  <TableRow key={index}>
                    <TableCell align="right">{`${item.discrption}`}</TableCell>
                    <TableCell align="right">{`${item.statusId}`}</TableCell>
                    <TableCell align="right">{item.date_created}</TableCell>
                    <TableCell align="right">{item.endDate}</TableCell>
                    <TableCell align="right">{item.remarks}</TableCell>
                    <TableCell align="right">
                      <img
                        src={duonArrow}
                        width={"20px"}
                        onClick={() => {
                          sendingToTheCreation(index);
                        }}
                      />
                    </TableCell>
                    {isOpen.stap && isOpen.openIndex === index && (
                      <ButtonsWrapper>
                        <>
                          {" "}
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={() => {
                              setOpenModal(true);
                            }}
                          >
                            מחיקת משימה
                          </Button>{" "}
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
                        </>
                        <Button
                          variant="outlined"
                          color="success"
                          onClick={() => {
                            showEditTask(item._id, index);
                          }}
                        >
                          עדכון משימה
                        </Button>
                      </ButtonsWrapper>
                    )}
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <UrlTask />

        {isOpenEditTask && (
          <UpdateTask onMission={taskOne} indexMission={isIndex}></UpdateTask>
        )}
      </WidthTable>
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
const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
