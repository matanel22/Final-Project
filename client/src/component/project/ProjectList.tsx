import React, { useEffect, useState } from "react";
import { Avatar, Box, TextField } from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import { Link } from "react-router-dom";
// import ButtonMission from "../UI/Button";
import TasksData, { token, userId, userName } from "../atom/Atom";
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

const ProjectList: React.FC<{ onProps: IProps[] }> = (props) => {
  const [loading, setLoading] = useState("");
  const [useId, setUseId] = useRecoilState<string>(userId);
  const [projId, setProjId] = useRecoilState(idPrj);
  const [updateProj, setUpdateProj] = useState<IProps>(Object);
  const [isopenUpdate, setIsUpdate] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isUsersPrem, setIsUsersPrem] = useState<IUsers>();
  const [indexProjData, setIndexProjData] = useState(0);
  const [isLogout, setIsLogout] = useState(false);
  const [dataToken, setDataToken] = useRecoilState(token);
  // const [open, setOpen] = React.useState(false);
  const [validPremissionUsers, setValidPremissionUsers] = useState(false);
  let histury = useHistory();
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
          // console.log("useId", useId);
          // console.log("resData", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(validPremissionUsers);
    };
    userS(useId);
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

  // useEffect(() => {
  //   if (isUsersPrem?.permissions) {
  //     setValidPremissionUsers(true);
  //   }
  // }, [validPremissionUsers]);
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
              <TableCell align="right">שם הפרוייקט</TableCell>
              <TableCell align="right">שם הצוות</TableCell>
              <TableCell align="right">שם הלקוח</TableCell>
              <TableCell align="right">סטטוס הפרוייקט</TableCell>
              <TableCell align="right"> האם יש משתמשים</TableCell>
              <TableCell align="right">למשימות הפרוייקט</TableCell>
              {validPremissionUsers && (
                <TableCell align="right">לעדכון הפרוייקט</TableCell>
              )}
            </TableRow>
          </TableHead>
          <TableBody>
            {props.onProps.length &&
              props.onProps.map((item, index) => (
                <TableRow>
                  <TableCell
                    sx={{ fontSize: "1.5rem" }}
                    align="right"
                  >{`${item.nameProject}`}</TableCell>
                  <TableCell
                    sx={{ fontSize: "1.5rem" }}
                    align="right"
                  >{`${item.staff}`}</TableCell>
                  <TableCell
                    sx={{ fontSize: "1.5rem" }}
                    align="right"
                  >{`${item.client}`}</TableCell>
                  <TableCell
                    sx={{ fontSize: "1.5rem" }}
                    align="right"
                  >{`${item.statusProject}`}</TableCell>
                  <TableCell
                    sx={{ fontSize: "1.5rem" }}
                    align="right"
                  >{`${item.amountOfUsers}`}</TableCell>

                  <TableCell align="right">
                    <Link to="/tasks">
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
                  </TableCell>
                  <TableCell align="right">
                    {" "}
                    {validPremissionUsers && (
                      <Button
                        variant="contained"
                        color="success"
                        onClick={() => {
                          showFormOnEdit(item._id, index);
                        }}
                      >
                        לעדכון הפרוייקט
                      </Button>
                    )}
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
        {/* </div> */}
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
