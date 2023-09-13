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
import { useRecoilState } from "recoil";
import TasksData, { idPrj, userId, userName } from "../atom/Atom";

import UpdateTask from "./updateTask";
import { UrlTask } from "./urlTask";
import PageLoader from "../Loading/Loading";
import styled, { css } from "styled-components";
import { blue } from "@mui/material/colors";

import duonArrow from "../../svg/downArrow.svg";
import leftArrow from "../../svg/leftArrow.svg";
import { MyObject } from "../project/AllProjects";
import { DeleteTask } from "./DeleteTask";
import { ButtonsPageTask } from "./ButtonsPageTask";
import { ButtonsTable } from "../ButtonsTable";

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
  { title: "הערות" },
  { title: "סוג משימה" },
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

  const PID: MyObject = useParams();
  const [totaleTasks, setTotaleTasks] = useState(0);
  const [projId, setProjId] = useRecoilState(idPrj);
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
  }, []);
  useEffect(() => {
    console.log(mis);
  }, [mis]);
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
        <ButtonsPageTask />
      </AppBar>
      <Container>
        <PageLoader>{}</PageLoader>

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
                {isOpen.stap && isOpen.openIndex === isIndex && (
                  <TableCell align="right">
                    <TableCell align="right">מחיקת משימה</TableCell>
                    <TableCell align="right">עדכון משימה</TableCell>
                  </TableCell>
                )}
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
                    <TableCell
                      sx={{
                        maxWidth: "200px",
                        maxHeight: "100px",
                        overflowY: "auto",
                      }}
                      align="right"
                    >
                      {item.remarks}
                    </TableCell>
                    <TableCell align="right">{item.taskType}</TableCell>

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
                    <DeleteTask
                      openModal={openModal}
                      setOpenModal={setOpenModal}
                      removeMission={removeMission}
                      sendingId={item.id}
                    />
                    <ButtonArrow
                      src={isOpen.stap ? duonArrow : leftArrow}
                      width={"20px"}
                      onClick={() => {
                        sendingToTheCreation(index);
                      }}
                    />
                  </TableRow>
                ))}
            </TableBody>
          </Table>
        </TableContainer>
        <UrlTask totaleTasks={totaleTasks} />

        {isOpenEditTask && (
          <UpdateTask onMission={taskOne} indexMission={isIndex}></UpdateTask>
        )}
      </Container>
    </>
  );
};
export default TasksList;

const WidthTable = styled.div`
  margin: 0 auto;
  margin-top: 1%;
  width: 80vw;
`;
const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
`;
const Container = styled.div`
  padding: 10px;
  width: 100vw;
  ${css`
    @media (max-width: 768px) {
      padding: 5px;

      overflow: hidden;
    }
  `}
`;
const ButtonArrow = styled.img``;
