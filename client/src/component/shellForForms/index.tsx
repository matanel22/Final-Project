import styled from "styled-components";
import homePage from "../image/homepage.png";
import React, { useEffect } from "react";
import { AppBar } from "@mui/material";
import { ButtonsPageTask } from "../tasks/ButtonsPageTask";
import axios from "axios";

interface IProps {
  urlNav1: string;
  urlNav2: string;
  children: React.ReactNode;
}
export const ShellForForms = ({ children, urlNav1, urlNav2 }: IProps) => {
  return (
    <>
      {urlNav1 !== "" &&
        urlNav2 !== "" && (
          <AppBar
            sx={{
              flexGrow: 1,
              minHeight: 100,
            }}
            position="static"
          >
            <ButtonsPageTask urlNav1={urlNav1} urlNav2={urlNav2} />
          </AppBar>
        )}
      <WarpperForms>{children}</WarpperForms>
    </>
  );
};

const WarpperForms = styled.div`
  display: flex;
  background-size: cover;
  background-position: center;
  height: 100vh;
  width: 100%;
  // background: linear-gradient(
  //   90deg,
  //   rgba(103, 95, 130, 1) 10%,
  //   rgba(105, 95, 224, 1) 49%,
  //   rgba(84, 72, 221, 1) 62%
  // );
  background: rgb(63, 83, 114);
  background: linear-gradient(
    90deg,
    rgba(63, 83, 114, 1) 100%,
    rgba(15, 75, 5, 1) 100%
  );
`;
