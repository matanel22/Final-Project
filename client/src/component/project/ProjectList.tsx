import React, { useEffect, useRef, useState } from "react";

import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import { Link } from "react-router-dom";
// import ButtonMission from "../UI/Button";
import { AllProjectData } from "../atom/Atom";
import { idPrj } from "../atom/Atom";
import edit from "../../svg/editminor.svg";
import styled, { css } from "styled-components";
import { blue } from "@mui/material/colors";

import {
  Button,
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
// const useStyles = makeStyles({
//   table: {
//     minWidth: 650,
//   },
// });
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
  staff: string;
  client: string;
  userId: string;
  statusProject: string;
  amountOfUsers: string;
}
const TITALE_PROJECTS = [
  { tytle: "שם הפרוייקט" },
  { tytle: "שם הצוות" },
  { tytle: "שם הלקוח" },
  { tytle: "סטטוס הפרוייקט" },
  { tytle: "האם יש משתמשים" },
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
  const [isUsersPrem, setIsUsersPrem] = useState<IUsers>();
  const [indexProjData, setIndexProjData] = useState(0);
  const [isIndex, setIsIndex] = useState(0);
  // const [isPro, setDataProject] = useRecoilState(AllProjectData);
  const sendingToTheCreation = (index: number) => {
    setIsIndex(index);
    setIsOpenShow({ ...isOpenShow, stap: !isOpenShow.stap, openIndex: index });
  };
  const [editMode, setEditMode] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
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

  const toggleEditMode = (index: number) => {
    const [isOpen, setIsOpen] = useState<Open>({ stap: false, openIndex: 0 });
    setEditMode((prevFormData) => {
      const updatedEditTogle = [...prevFormData];
      updatedEditTogle[index] = !updatedEditTogle[index];
      // console.log(updatedEditTogle);
      return updatedEditTogle;
    });
  };

  const color = blue[100];
  return (
    <Container>
      <PageLoader>{loading}</PageLoader>

      <TableContainer>
        <Table aria-label="simple table">
          <TableHead>
            <TableRow
              sx={{
                bgcolor: color,
                "& th": {
                  fontSize: "1.25rem",
                  // color: "rgba(96, 96, 96)",
                },
              }}
            >
              {TITALE_PROJECTS.map((item: any) => {
                return <TableCell align="right">{item.tytle}</TableCell>;
              })}
              {isOpenShow.stap && isOpenShow.openIndex === isIndex && (
                <>
                  <TableCell align="right">לעדכון הפרוייקט</TableCell>
                  <TableCell align="right">למשימות הפרוייקט</TableCell>
                </>
              )}
            </TableRow>
          </TableHead>

          <TableBody>
            {props.dataProject.length &&
              props.dataProject.map((item, index) => (
                <TableRow key={index}>
                  <TableCell align="right" sx={{ fontSize: "1.5rem" }}>
                    {item.nameProject}
                  </TableCell>
                  <TableCell sx={{ fontSize: "1.5rem" }} align="right">
                    {item.staff}
                  </TableCell>
                  <TableCell sx={{ fontSize: "1.5rem" }} align="right">
                    {item.client}
                  </TableCell>
                  <TableCell sx={{ fontSize: "1.5rem" }} align="right">
                    {item.statusProject}
                  </TableCell>
                  <TableCell sx={{ fontSize: "1.5rem" }} align="right">
                    {item.amountOfUsers}
                  </TableCell>

                  {isOpenShow.stap && isOpenShow.openIndex === index && (
                    <Buttons
                      projectId={item._id}
                      // onClickMission={setProjId}
                      validPremissionUsers={validPremissionUsers}
                      onClickShowModal={showFormOnEdit}
                      index={index}
                      buttonDel="משימות"
                      buttonUpdate="עדכון פרוייקט"
                    />
                  )}
                  <img
                    src={isOpenShow.stap ? duonArrow : leftArrow}
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

const EditSvg = styled.img``;

export const Container = styled.div`
  padding: 10px;
  width: 100vw;
  ${css`
    @media (max-width: 768px) {
      padding: 5px;

      overflow: hidden;
    }
  `}
`;
const WidthTable = styled.div`
  width: 20vw;
`;
const TableContaine = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledTable = styled.table`
  border-collapse: collapse;
  // width: 100%;
`;

export const TableCe = styled.td`
  border: 1px solid black;
  padding: 8px;
`;

const StyledInput = styled.input`
  border: none;
  // width: 20%;
  background-color: transparent;
  fontsize: 1.5rem;
`;

const Butto = styled.button`
  margin-top: 8px;
`;

// import * as React from 'react';
// import { styled } from '@mui/material/styles';
// import Table from '@mui/material/Table';
// import TableBody from '@mui/material/TableBody';
// import TableCell, { tableCellClasses } from '@mui/material/TableCell';
// import TableContainer from '@mui/material/TableContainer';
// import TableHead from '@mui/material/TableHead';
// import TableRow from '@mui/material/TableRow';
// import Paper from '@mui/material/Paper';

// function createData(
//   name: string,
//   calories: number,
//   fat: number,
//   carbs: number,
//   protein: number,
// ) {
//   return { name, calories, fat, carbs, protein };
// }

// const rows = [
//   createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//   createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//   createData('Eclair', 262, 16.0, 24, 6.0),
//   createData('Cupcake', 305, 3.7, 67, 4.3),
//   createData('Gingerbread', 356, 16.0, 49, 3.9),
// ];

// export default function CustomizedTables() {
//   return (
//     <TableContainer component={Paper}>
//       <Table sx={{ minWidth: 700 }} aria-label="customized table">
//         <TableHead>
//           <TableRow>
//             <StyledTableCell>Dessert (100g serving)</StyledTableCell>
//             <StyledTableCell align="right">Calories</StyledTableCell>
//             <StyledTableCell align="right">Fat&nbsp;(g)</StyledTableCell>
//             <StyledTableCell align="right">Carbs&nbsp;(g)</StyledTableCell>
//             <StyledTableCell align="right">Protein&nbsp;(g)</StyledTableCell>
//           </TableRow>
//         </TableHead>
//         <TableBody>
//           {rows.map((row) => (
//             <StyledTableRow key={row.name}>
//               <StyledTableCell component="th" scope="row">
//                 {row.name}
//               </StyledTableCell>
//               <StyledTableCell align="right">{row.calories}</StyledTableCell>
//               <StyledTableCell align="right">{row.fat}</StyledTableCell>
//               <StyledTableCell align="right">{row.carbs}</StyledTableCell>
//               <StyledTableCell align="right">{row.protein}</StyledTableCell>
//             </StyledTableRow>
//           ))}
//         </TableBody>
//       </Table>
//     </TableContainer>
//   );
// }
