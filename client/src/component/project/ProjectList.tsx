// import { Button } from "@mui/material";
import classes from "./ProjectList.module.css";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import axios from "axios";
import { Link } from "react-router-dom";
import ButtonMission from "../UI/Button";
import TasksData from "../atom/Atom";
import { idPrj } from "../atom/Atom";
import Card from "../UI/card";
import { Button } from "@mui/material";

export interface IProps {
  _id: string;
  nameProject: string;
  staff: string;
  client: string;
  statusProject: string;
}
const ProjectList: React.FC<{ onProps: IProps[] }> = (props) => {
  const [missionData, SetMissionData] = useState([]);
  const [isOpenMission, setIsOpenMission] = useState(false);
  const [isMission, setIsMission] = useRecoilState(TasksData);
  const [projId, setProjId] = useRecoilState(idPrj);
  // const [isValideDel, setIsValideDel] = useState(false);
  // const [isMasseg, setMessege] = useState<string>("");
  const removeProject = (id: string) => {
    let url = `http://localhost:3001/api/routs/router/deleteSpcificProject/${id}`;
    axios
      .delete(url)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const sendProjectID = (id: string) => {
    let url = "http://localhost:3001/api/routs/router/allMissionOfProject";
    axios
      .post(url, { id })
      .then((res) => {
        console.log(res.data);
        SetMissionData(res.data);
        setIsMission(res.data);
        setIsOpenMission(!isOpenMission);
      })
      .catch((res) => {
        console.log(res);
      });
  };
  // useEffect(()=>{
  //   props.onProps.map((item)=>{
  //     setProjId(item._id)
  //   })
  // })

  return (
    <div>
      <ul>
        {props.onProps.map((item, index) => {
          console.log(typeof item._id);

          return (
            <Card className={classes.specificproject} key={index}>
              <li
                className={classes.allBody}
                onClick={() => {
                  sendProjectID(item._id);
                }}
              >
                {`שם:${item.nameProject}`}
                <br />
                {`מפתח:${item.staff}`}
                <br />
                {`לקוח:${item.client}`}
                <br />
                {`סטטוס:${item.statusProject}`}
                <br />

                <ButtonMission
                  onClick={() => {
                    removeProject(item._id);
                  }}
                >
                  למחיקה לחץ כאן
                </ButtonMission>

                <Link to="/tasks">
                  <ButtonMission
                    onClick={() => {
                      setProjId(item._id);
                    }}
                  >
                    למשימות לחץ כאן
                  </ButtonMission>
                </Link>
              </li>
            </Card>
          );
        })}
      </ul>
      <Link to="/createProject">
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          יצירת פרוייקט
        </Button>
      </Link>
    </div>
  );
};

export default ProjectList;
