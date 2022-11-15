import { TableHead } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";
import TasksData from "../atom/Atom";
import ButtonMisson from "../UI/Button";
import Card from "../UI/card";
import CreateTasks from "./createTasks";

interface IFormMission {
  onMisson: (c: [{}]) => void;
  discrption: String;
  missionStatus: String;
  projectId: String;
  data_created: {
    type: Date;
  };
  endDate: { type: Date };
  remarks: String;
}
// : React.FC<{ onShowMission: IFormMission[] }
const TasksList = () => {
  const [mis, setMis] = useRecoilState(TasksData);
  const [isOpen, setIsOpen] = useState(false);

  const sendingToTheCreation = () => {
    setIsOpen(!isOpen);
  };

  let validtasks =
    mis.length === 0 ? <h1>אין משימות בפרוייקט זה</h1> : <h1>משימות</h1>;
  return (
    <TableHead>
      {validtasks}
      <ul>
        {mis.map((item: any, index) => {
          return (
            <Card key={index}>
              {`תיאור:${item.discrption}`}
              {`משימות סטטוס:${item.missionStatus}`}
              {`תאריך התחלה${item.data_created}`}
              {`תאריך סיום${item.endDate}`}
              {`הערות${item.remarks}`}
            </Card>
          );
        })}
      </ul>
      <ButtonMisson onClick={sendingToTheCreation}>
        ליצירת משימה חדשה
      </ButtonMisson>
      {isOpen && <CreateTasks></CreateTasks>}
    </TableHead>
  );
};
export default TasksList;

// {`שם:${item.nameProject}`}
// {`מפתח:${item.staff}`}
