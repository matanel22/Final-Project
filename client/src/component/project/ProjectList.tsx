import React, { useEffect, useState } from "react";
import { Box, Icon, makeStyles } from "@mui/material";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import { Link } from "react-router-dom";
import ButtonMission from "../UI/Button";
import TasksData from "../atom/Atom";
import { idPrj } from "../atom/Atom";
import Card from "../UI/card";

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
// const useStyles = makeStyles({
//   table: {
//     minWidth: 650,
//   },
// });

export interface IProps {
  _id: string;
  nameProject: string;
  staff: string;
  client: string;
  statusProject: string;
  amountOfUsers: string;
}

const ProjectList: React.FC<{ onProps: IProps[] }> = (props) => {
  const [projId, setProjId] = useRecoilState(idPrj);
  const [updateProj, setUpdateProj] = useState<IProps[]>();
  const [isUpdate, setIsUpdate] = useState(false);
  const updateSpicificProj = (id: string) => {
    setIsUpdate(true);
    let url = `http://localhost:3001/api/routs/router/updateProject/${id}`;
    axios
      .put(
        url,
        props.onProps.filter((item) => {
          return item._id === id ? props.onProps : "";
        })
      )
      .then((res) => {
        setUpdateProj(res.data);
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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
            <Link to="/createProject">
              <Button
                color="secondary"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {/* <Icon color="primary">add_circle</Icon> */}
                הוספת פרוייקט
              </Button>
            </Link>
            ;{/* <Button color="inherit">Login</Button> */}
          </Toolbar>
        </AppBar>
      </Box>
      {/* c
       */}
      {/* className={classes.table} aria-label="simple table" */}
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell align="right">Protein&nbsp;(g)</TableCell>
              <TableCell align="right">שם הפרוייקט</TableCell>
              <TableCell align="right">שם הצוות</TableCell>
              <TableCell align="right">שם הלקוח</TableCell>
              <TableCell align="right">סטטוס הפרוייקט</TableCell>
              <TableCell align="right"> האם יש משתמשים</TableCell>
              <TableCell align="right">לעדכון הפרוייקט</TableCell>
              <TableCell align="right">למשימות הפרוייקט</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {props.onProps.map((item) => (
              <TableRow>
                <TableCell component="th" scope="row">
                  {/* {item.name} */}
                </TableCell>
                <TableCell align="right"> {`${item.nameProject}`}</TableCell>
                <TableCell align="right">{`${item.staff}`}</TableCell>
                <TableCell align="right">{`${item.client}`}</TableCell>
                <TableCell align="right"> {`${item.statusProject}`}</TableCell>
                <TableCell align="right"> {`${item.amountOfUsers}`}</TableCell>

                <TableCell align="right">
                  {" "}
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => {
                      updateSpicificProj(item._id);
                    }}
                  >
                    לעדכון הפרוייקט
                  </Button>
                </TableCell>
                <TableCell align="right">
                  {" "}
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      {/* {isUpdate && <UpdateProject UP={updateProj}></UpdateProject>} */}
    </div>
  );
};

export default ProjectList;
