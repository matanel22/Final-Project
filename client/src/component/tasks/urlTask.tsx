import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { IFormMission } from "./TasksList";
import { useRecoilState } from "recoil";
import TasksData from "../atom/Atom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import PageLoader from "../Loading/Loading";
import LoadingUrl from "./LoadingUrl";
import { TableCell } from "@mui/material";

// "https://quickchart.io/sandbox/#%7B%22chart%22%3A%22%7B%5Cn%20%20type%3A%20'radialGauge'%2C%5Cn%20%20data%3A%20%7B%5Cn%20%20%20%20datasets%3A%20%5B%7B%5Cn%20%20%20%20%20%20data%3A%20%5B80%5D%2C%5Cn%20%20%20%20%20%20backgroundColor%3A%20getGradientFillHelper('horizontal'%2C%20%5B'red'%2C%20'blue'%5D)%2C%5Cn%20%20%20%20%7D%5D%5Cn%20%20%7D%2C%5Cn%20%20options%3A%20%7B%5Cn%20%20%20%20%2F%2F%20See%20https%3A%2F%2Fgithub.com%2Fpandameister%2Fchartjs-chart-radial-gauge%23options%5Cn%20%20%20%20domain%3A%20%5B0%2C%20100%5D%2C%5Cn%20%20%20%20trackColor%3A%20'%23f0f8ff'%2C%20%5Cn%20%20%20%20centerPercentage%3A%2090%2C%5Cn%20%20%20%20centerArea%3A%20%7B%5Cn%20%20%20%20%20%20text%3A%20(val)%20%3D%3E%20val%20%2B%20'%25'%2C%5Cn%20%20%20%20%7D%2C%5Cn%20%20%7D%5Cn%7D%22%2C%22width%22%3A500%2C%22height%22%3A300%2C%22version%22%3A%222%22%2C%22backgroundColor%22%3A%22%23fff%22%7D"
interface IP {
  openIndex: number;
  stap: boolean;
}
interface IProps {
  // totaleTasks: number;
  projectId: string;
}
export const UrlTask = ({ projectId }: IProps) => {
  const [num, setNum] = useState(100);
  const [mis, setMis] = useRecoilState(TasksData);
  const [Loctionpath, setLoctionPath] = useState(false);

  const isAboutPage = useLocation();

  useEffect(() => {
    if (isAboutPage.pathname === "/tasks/" + projectId) {
      {
        setLoctionPath(true);
      }
    } else {
      setLoctionPath(false);
    }
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const url =
          "http://localhost:3001/api/routs/router/allMissionOfProject";
        const response = await axios.post(url, { id: projectId });
        setMis(response.data);

        const unfinishedTasks = response.data.filter(
          (item: IFormMission) => item.statusId !== "משימה הושלמה"
        );
        const tempNum =
          (unfinishedTasks.length / response.data.length) * 100 || 0;
        setNum(100 - tempNum);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [projectId, num]);

  return (
    <WarpperApi locPath={Loctionpath}>
      <StylyApi
        locPath={Loctionpath}
        src={`https://quickchart.io/chart?w=800&h=500&c=
    {type:'radialGauge',
    data:{datasets:[{data:[${num}],
    ${
      num < 50 ? `"backgroundColor":"royalblue"` : `"backgroundColor":"green"`
    } }]}}`}
      />
    </WarpperApi>
  );
};
interface LoctionpathUrl {
  locPath: boolean;
}
const StylyApi = styled.img<LoctionpathUrl>`
  width: ${(props) => (props.locPath ? "20vw" : "120px")};
`;
const WarpperApi = styled.div<LoctionpathUrl>`
  width: 100%;
  margin-top: ${(props) => (props.locPath ? "" : "")};
  display: flex;
  justify-content: center;
`;
