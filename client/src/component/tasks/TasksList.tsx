import {
  AppBar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import axios from "axios";

import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import TasksData, {
  UserInfo,
  idPrj,
  searchTask,
  userId,
  userName,
} from "../atom/Atom";

import UpdateTask from "./updateTask";
import { UrlTask } from "./urlTask";
import PageLoader from "../Loading/Loading";
import styled, { css } from "styled-components";
import { blue } from "@mui/material/colors";

import duonArrow from "../../svg/downArrow.svg";
import leftArrow from "../../svg/leftArrow.svg";
import Message from "../../svg/message.svg";
import { MyObject } from "../project/AllProjects";
import { DeleteTask } from "./DeleteTask";
import { ButtonsPageTask } from "./ButtonsPageTask";
import { ButtonsTable } from "../ButtonsTable";
import RemindUser from "./RemindUser";

import SearchTask from "../searchField/SearchTask";

export interface IFormMission {
  id: string;
  discrption: string;
  statusId: string;
  projectId: string;
  date_created: Date;
  endDate: Date;
  remarks: string;
  taskType: string;
}
export interface Open {
  stap: boolean;
  openIndex: number;
}
const TITALE_MISSIONS = [
  { title: "תיאור המשימה" },
  { title: "סטטוס משימה" },
  { title: "תאריך התחלה" },
  { title: "עד תאריך" },

  { title: "סוג משימה" },
  { title: "הערות" },
  // { title: "עוד..." },
];

const TasksList = () => {
  const [mis, setMis] = useRecoilState(TasksData);

  const [isOpen, setIsOpen] = useState<Open>({ stap: false, openIndex: 0 });
  const [taskOne, setTaskOne] = useState<IFormMission>(Object);
  const [isOpenEditTask, setIsOpenEditTask] = useState(false);
  const [isIndex, setIsIndex] = useState(0);
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);
  const [TasksCloseCompletion, setTasksCloseCompletion] = useState(0);
  // const [searchTask,setSearchTask]=useState()
  const [openModal, setOpenModal] = useState(false);
  const [openMessageModal, setOpenMessageModal] = useState({
    stap: false,
    openIndex: 0,
  });
  const PID: MyObject = useParams();
  const filteredNames = useRecoilValue(searchTask);
  const userInfo = useRecoilValue(UserInfo);
  const sendingToTheCreation = (index: number) => {
    setIsIndex(index);
    setIsOpen({ ...isOpen, stap: !isOpen.stap, openIndex: index });
  };
  const showEditTask = async (_id: string, index: number) => {
    setIsIndex(index);

    let url = "http://localhost:3001/api/routs/router/taskOne";
    await axios.post(url, { _id }).then((res) => {
      setTaskOne(res.data);
    });
    setIsOpenEditTask(!isOpenEditTask);
  };

  const removeMission = async (_id: string) => {
    let url = `http://localhost:3001/api/routs/router/deleteSpcificMission/${_id}`;
    const missionDelete = mis.filter((item) => {
      return item.id !== _id;
    });
    setMis(missionDelete);
    await axios
      .delete(url)
      .then((response) => {})
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    if (filteredNames) {
      let url = "http://localhost:3001/api/routs/router/taskByDate";
      axios
        .post(url, { date: filteredNames, projectId: PID.id })
        .then((res) => {
          setMis(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      const sendProjectID = (id: string) => {
        let url = "http://localhost:3001/api/routs/router/allMissionOfProject";
        axios
          .post(url, { id })
          .then((res) => {
            setMis(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      };
      sendProjectID(PID.id);
    }
  }, [filteredNames]);

  const color = blue[100];
  return (
    <StyleHome>
      <AppBar
        sx={{
          flexGrow: 1,
          minHeight: 100,
        }}
        position="static"
      >
        <ButtonsPageTask
          urlNav1={`/projects/${userInfo._id}`}
          urlNav2={"/createTasks"}
        />
        <SearchTask />
      </AppBar>
      <Container>
        <PageLoader>{""}</PageLoader>

        <TableContainer>
          <Table aria-label="simple table">
            <TableHead>
              {/* <RemindUser dataMission={mis} /> */}
              <TableRow
                sx={{
                  bgcolor: color,
                  "& th": {
                    fontSize: "1.25rem",
                  },
                }}
              >
                {TITALE_MISSIONS.map((item, index) => {
                  return (
                    <TableCell align="right" key={index}>
                      {item.title}
                    </TableCell>
                  );
                })}
                {isOpen.stap && isOpen.openIndex === isIndex && (
                  <>
                    <TableCell align="right">מחיקת משימה</TableCell>
                    <TableCell align="right">עדכון משימה</TableCell>
                  </>
                )}
                <TableCell align="right">{`עוד...`}</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {mis.length === 0 && <p>אין משימות בפרוייקט</p>}
              {mis.length > 0 &&
                mis.map((item: any, index) => (
                  <TableRow key={index}>
                    <TableCell
                      align="right"
                      sx={{ fontSize: "1.25rem" }}
                    >{`${item.discrption}`}</TableCell>
                    <TableCell
                      align="right"
                      sx={{ fontSize: "1.25rem" }}
                    >{`${item.statusId}`}</TableCell>
                    <TableCell align="right" sx={{ fontSize: "1.25rem" }}>
                      {item.date_created}
                    </TableCell>
                    <TableCell
                      align="right"
                      sx={{
                        fontSize: "1.25rem",
                        // color: TasksCloseCompletion < 0 ? "red" : "black",
                      }}
                    >
                      {item.endDate}
                    </TableCell>
                    <TableCell align="right" sx={{ fontSize: "1.25rem" }}>
                      {item.taskType}
                    </TableCell>
                    <TableCell align="right">
                      {
                        <MessageImg
                          src={Message}
                          onClick={() => {
                            setOpenMessageModal((prev) => {
                              return {
                                ...prev,
                                stap: true,
                                openIndex: index,
                              };
                            });
                          }}
                        />
                      }
                    </TableCell>

                    {isOpen.stap && isOpen.openIndex === index && (
                      <ButtonsTable
                        setOpenModal={setOpenModal}
                        openModal={openModal}
                        showEditTask={showEditTask}
                        itemId={item.id}
                        index={index}
                        buttonDel={"מחיקת משימה"}
                        buttonUpdate={"עדכון משימה"}
                      />
                    )}

                    {openMessageModal.stap &&
                      openMessageModal.openIndex === index && (
                        <RemindUser
                          endDate={new Date(item.endDate)}
                          remarks={item.remarks}
                          openMessageModal={openMessageModal.stap}
                          setOpenMessageModal={setOpenMessageModal}
                          index={index}
                          TasksCloseCompletion={TasksCloseCompletion}
                          setTasksCloseCompletion={setTasksCloseCompletion}
                        />
                      )}
                    <DeleteTask
                      openModal={openModal}
                      setOpenModal={setOpenModal}
                      removeMission={removeMission}
                      sendingId={item.id}
                    />
                    <TableCell align="right" sx={{ fontSize: "1.25rem" }}>
                      <ButtonArrow
                        src={isOpen.stap ? duonArrow : leftArrow}
                        width={"20px"}
                        onClick={() => {
                          sendingToTheCreation(index);
                        }}
                      />
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <UrlTask projectId={PID.id} />

        {isOpenEditTask && (
          <UpdateTask onMission={taskOne} indexMission={isIndex}></UpdateTask>
        )}
      </Container>
    </StyleHome>
  );
};
export default TasksList;
const MessageImg = styled.img`
  cursor: pointer;
`;
const WidthTable = styled.div`
  margin: 0 auto;
  margin-top: 1%;
  width: 80vw;
`;
const StyleHome = styled.div`
  ${css`
    @media (max-width: 768px) {
      padding: 5px;

      overflow: hidden;
    }
  `}
`;
const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const Container = styled.div`
  padding: 10px;
  width: 80vw;
  margin: 0 auto;
  ${css`
    @media (max-width: 768px) {
      padding: 5px;

      overflow: hidden;
    }
  `}
`;
const ButtonArrow = styled.img`
  cursor: pointer;
`;
