import { Button } from "@mui/material";
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import ProjectList from "./ProjectList";
import { useRecoilState } from "recoil";
import { DP, userId } from "../atom/Atom";
export interface IProps {
  _id: string;
  readonly nameProject: string;
  staff: string;
  userId: string;
  readonly client: string;
  statusProject: string;
  amountOfUsers: string;
}

const AllProjects = () => {
  const [dataProject, setDataProject] = useState<IProps[]>([]);
  const [validata, setValidata] = useState(false);
  const [useId, setUseId] = useRecoilState<string>(userId);

  useEffect(() => {
    const fetch = async (id: string) => {
      try {
        let url = "http://localhost:3001/api/routs/router/allProjects";
        await axios.post(url, { id }).then((response) => {
          console.log(response.data);
          setValidata(true);
          setDataProject(response.data);
        });
      } catch (error) {
        console.log(error);
      }
    };
    fetch(useId);
  }, []);

  let quantityCheck =
    dataProject.length === 0 ? <h1>לא נוצרו פרוייקטים </h1> : "";

  return (
    <>
      <ProjectList onProps={dataProject} />
      {quantityCheck}
    </>
  );
};

export default AllProjects;
