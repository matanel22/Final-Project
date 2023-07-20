import React, { useEffect, useRef, useState } from "react";
import { Avatar, Box, Input, TextField } from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import { Link } from "react-router-dom";
// import ButtonMission from "../UI/Button";
import TasksData, {
  AllProjectData,
  token,
  userId,
  userName,
} from "../atom/Atom";
import { idPrj } from "../atom/Atom";
import classes from "./ProjectList.module.css";
import { useHistory } from "react-router-dom";
import styled, { css } from "styled-components";
import { blue } from "@mui/material/colors";

import {
  AppBar,
  Button,
  createStyles,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Theme,
  Toolbar,
  Typography,
} from "@mui/material";
import UpdateProject from "./UpdateProject";
import { SubmitHandler, useForm } from "react-hook-form";
import Tooltip from "@mui/material/Tooltip";
import OvalButton from "../UI/ButtonStyle";
import PageLoader from "../Loading/Loading";
import { MyObject } from "./AllProjects";
// const useStyles = makeStyles({
//   table: {
//     minWidth: 650,
//   },
// });
interface IUsers {
  _id: string;
  permissions: String;
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
  "שם הפרוייקט",
  "שם הצוות",
  "שם הלקוח",
  "סטטוס הפרוייקט",
  "האם יש משתמשים",
  "למשימות הפרוייקט",
];

const ProjectList: React.FC<{
  dataProject: IProps[];
  valideRoleId: MyObject;
}> = (props) => {
  const [loading, setLoading] = useState("");

  const [projId, setProjId] = useRecoilState(idPrj);
  const [updateProj, setUpdateProj] = useState<IProps>(Object);
  const [isopenUpdate, setIsUpdate] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isUsersPrem, setIsUsersPrem] = useState<IUsers>();
  const [indexProjData, setIndexProjData] = useState(0);
  const [isPro, setDataProject] = useRecoilState(AllProjectData);
  const [editMode, setEditMode] = useState([
    false,
    false,
    false,
    false,
    false,
    false,
  ]);
  const [validPremissionUsers, setValidPremissionUsers] = useState(false);

  const editButtonRef = useRef(null);

  useEffect(() => {
    const userS = (_id: string) => {
      let url = "http://localhost:3001/api/routs/router/usersSpecific";
      axios
        .post(url, { _id })
        .then((res) => {
          setIsUsersPrem(res.data);
          if (res.data.permissions) {
            setValidPremissionUsers(true);
          }
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(validPremissionUsers);
    };
    userS(props.valideRoleId.id);
  }, []);

  const showFormOnEdit = async (id: string, index: number) => {
    setIsOpen(!isOpen);
    setIndexProjData(index);
    setIsOpenUpdate(isOpenUpdate);
    let url = "http://localhost:3001/api/routs/router/projSpecific";
    await axios.post(url, { id }).then((res) => {
      setUpdateProj(res.data);
      console.log(res.data);
    });
    return setIsUpdate(true);
  };

  const toggleEditMode = (index: number) => {
    setEditMode((prevFormData) => {
      const updatedEditTogle = [...prevFormData];
      updatedEditTogle[index] = !updatedEditTogle[index];
      // console.log(updatedEditTogle);
      return updatedEditTogle;
    });
  };
  const handleChange = (event: any, index: number) => {
    if (editMode) {
      const { value } = event.target;
      setDataProject((prevFormData) => {
        const updatedFormData = [...prevFormData];
        updatedFormData[index] = value;
        return updatedFormData;
      });
    }
  };
  const handleOutsideClick = (event: any) => {
    // console.log(editButtonRef.current);

    if (
      editButtonRef.current
      // !editButtonRef.current.contains(event.target)
    ) {
      setDataProject((prevFormData) =>
        prevFormData.map((field) => ({
          ...field,
          editMode: false,
        }))
      );
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleOutsideClick);

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, []);
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
                  color: "rgba(96, 96, 96)",
                },
              }}
            >
              {TITALE_PROJECTS.map((item: string) => {
                return <TableCell align="right">{item}</TableCell>;
              })}
              {validPremissionUsers && (
                <TableCell align="right">לעדכון הפרוייקט</TableCell>
              )}
            </TableRow>
          </TableHead>
        </Table>
        {/* </div> */}
      </TableContainer>
      <TableContaine>
        <StyledTable>
          <tbody>
            {props.dataProject.length &&
              props.dataProject.map((item, index) => (
                <tr key={index}>
                  <TableCe>
                    <StyledInput
                      // sx={{ fontSize: "1.5rem" }}
                      id="my-input"
                      // aria-describedby="my-helper-text"
                      type="text"
                      value={item.nameProject}
                      onChange={(event) => handleChange(event, index)}
                      disabled={!editMode[index]}
                    />
                    <StyledInput
                      id="my-input"
                      type="text"
                      value={item.staff}
                      onChange={(event) => handleChange(event, index)}
                      disabled={!editMode[index]}
                    />
                    <StyledInput
                      // sx={{ fontSize: "1.5rem" }}
                      id="my-input"
                      aria-describedby="my-helper-text"
                      type="text"
                      value={item.client}
                      onChange={(event) => handleChange(event, index)}
                      disabled={!editMode[index]}
                    />
                    <StyledInput
                      // sx={{ fontSize: "1.5rem" }}
                      id="my-input"
                      aria-describedby="my-helper-text"
                      type="text"
                      value={item.statusProject}
                      onChange={(event) => handleChange(event, index)}
                      disabled={!editMode[index]}
                    />
                    <StyledInput
                      // sx={{ fontSize: "1.5rem" }}
                      id="my-input"
                      aria-describedby="my-helper-text"
                      type="text"
                      value={item.amountOfUsers}
                      onChange={(event) => handleChange(event, index)}
                      disabled={!editMode[index]}
                    />
                    {/* <button
                      ref={editButtonRef}
                      onClick={() => {
                        toggleEditMode(index);
                      }}
                    >
                      {editMode[index] ? "לעריכה" : "Enable Edit Mode"}
                    </button> */}
                    <TableCe align="right">
                      <Link to={`/tasks/${item._id}`}>
                        <Button
                          variant="contained"
                          color="primary"
                          onClick={() => {
                            setProjId(item._id);
                          }}
                        >
                          למשימות לחץ כאן
                        </Button>
                      </Link>
                    </TableCe>
                    <TableCe align="right">
                      {" "}
                      {validPremissionUsers && (
                        <Button
                          ref={editButtonRef}
                          color="success"
                          onClick={() => {
                            toggleEditMode(index);
                          }}
                        >
                          {editMode[index] ? "לעריכה" : "Enable Edit Mode"}
                        </Button>
                      )}
                    </TableCe>
                  </TableCe>
                </tr>
              ))}
          </tbody>
        </StyledTable>
      </TableContaine>

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

const TableCe = styled.td`
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
