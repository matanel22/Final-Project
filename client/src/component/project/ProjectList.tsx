import React, { useEffect, useRef, useState } from "react";

import axios from "axios";

import styled, { css } from "styled-components";
import { blue } from "@mui/material/colors";

import {
  Button,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableContainer,
  TableHead,
} from "@mui/material";
import TableRow from "@mui/material/TableRow";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import UpdateProject from "./UpdateProject";

import PageLoader from "../Loading/Loading";
import { MyObject } from "./AllProjects";
import { Buttons } from "./Buttons";
// import { Open } from "../tasks/TasksList";
import duonArrow from "../../svg/downArrow.svg";
import leftArrow from "../../svg/leftArrow.svg";
import YourComponent from "../searchField";
import { ListUsersOfProject } from "../ListUsersOfProject";
import { UrlTask } from "../tasks/urlTask";

interface IUsers {
  _id: string;
  permissions: string;
  name: string;
  email: string;
  pass: string;
}
export interface IProps {
  _id: string;
  nameProject: string;
  staff: string[];
  client: string;
  projectNumber: string;
  // matchingUsers: string[];

  statusProject: string;
  amountOfUsers: string;
}
const TITALE_PROJECTS = [
  { title: "שם הפרוייקט" },
  { title: "מספר פרוייקט" },
  { title: "אחראי פיתוח" },
  { title: "שם הלקוח" },
  { title: "סטטוס הפרוייקט" },
  { title: "סטטוס משימות" },
  // { title: "האם יש משתמשים" },
];
interface Open {
  stap: boolean;
  openIndex: number;
}
const ProjectList: React.FC<{
  dataProject: IProps[];
  valideRoleId: MyObject;
}> = (props) => {
  const [loading, setLoading] = useState("");

  const [updateProj, setUpdateProj] = useState<IProps>(Object);
  const [isopenUpdate, setIsUpdate] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenShow, setIsOpenShow] = useState<Open>({
    stap: false,
    openIndex: 0,
  });
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);

  const [indexProjData, setIndexProjData] = useState(0);
  const [isIndex, setIsIndex] = useState(0);

  // const [isPro, setDataProject] = useRecoilState(AllProjectData);
  const sendingToTheCreation = (index: number) => {
    setIsIndex(index);
    setIsOpenShow({ ...isOpenShow, stap: !isOpenShow.stap, openIndex: index });
  };

  const [validPremissionUsers, setValidPremissionUsers] = useState(false);

  const showFormOnEdit = async (id: string, index: number) => {
    setIsOpen(!isOpen);
    setIndexProjData(index);
    setIsOpenUpdate(isOpenUpdate);
    let url = "http://localhost:3001/api/routs/router/projSpecific";
    await axios.post(url, { id }).then((res) => {
      setUpdateProj(res.data);
    });
    return setIsUpdate(true);
  };

  const color = blue[100];
  return (
    <Container>
      <PageLoader>{loading}</PageLoader>
      <YourComponent />
      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow
              sx={{
                bgcolor: color,
                "& th": {
                  fontSize: "1.25rem",
                },
              }}
            >
              {TITALE_PROJECTS.map((item, index) => {
                return (
                  <TableCell align="right" key={index}>
                    {item.title}
                  </TableCell>
                );
              })}
              {isOpenShow.stap && isOpenShow.openIndex === isIndex && (
                <TableCell align="right">
                  <TableCell align="right">לעדכון הפרוייקט</TableCell>
                  <TableCell align="right">למשימות הפרוייקט</TableCell>
                </TableCell>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {props.dataProject.length &&
              props.dataProject.map((item, index) => (
                <TableRow key={index}>
                  <TableCell align="right">{item.nameProject}</TableCell>
                  <TableCell align="right">{item.projectNumber}</TableCell>
                  <TableCell align="right">
                    <ListUsersOfProject staff={item.staff} />
                  </TableCell>

                  <TableCell align="right">{item.client}</TableCell>
                  <TableCell align="right">{item.statusProject}</TableCell>

                  <TableCell align="right">
                    <UrlTask projectId={item._id}></UrlTask>
                  </TableCell>
                  {/* )} */}

                  {isOpenShow.stap && isOpenShow.openIndex === index && (
                    <Buttons
                      projectId={item._id}
                      validPremissionUsers={validPremissionUsers}
                      onClickShowModal={showFormOnEdit}
                      index={index}
                      buttonDel="משימות"
                      buttonUpdate="עדכון"
                    />
                  )}

                  <TableCell align="right">
                    <ArrowLeft
                      src={
                        isOpenShow.stap && isOpenShow.openIndex === index
                          ? duonArrow
                          : leftArrow
                      }
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
      {isOpen && (
        <UpdateProject
          projIndex={indexProjData}
          onUpdate={updateProj}
          openUpdate={isOpen}
        ></UpdateProject>
      )}
    </Container>
  );
};

export default ProjectList;
// editProj={updateProj}

const ArrowLeft = styled.img`
  cursor: pointer;
`;

export const Container = styled.div`
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

export const TableCe = styled.td`
  border: 1px solid black;
  padding: 8px;
`;
