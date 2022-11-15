import { Button } from "@mui/material";
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import ProjectList from "./ProjectList";

const AllProjects = () => {
  const [dataProject, setDataProject] = useState([]);
  const [valideta, setValidata] = useState(false);

  useEffect(() => {
    const fatch = async () => {
      try {
        let url = "http://localhost:3001/api/routs/router/allProjects";
        let response = await axios.get(url);
        console.log(response.data);
        setDataProject(response.data);
        setValidata(dataProject.length === 0);
      } catch (error) {
        console.log(error);
      }
    };
    fatch();
  }, [valideta]);

  let quantityCheck =
    dataProject.length === 0 ? <h1>לא נוצרו פרוייקטים </h1> : "";

  return (
    <div>
      {quantityCheck}
      <ProjectList onProps={dataProject} />
    </div>
  );
};

export default AllProjects;
