import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { useHistory } from "react-router-dom";
import { UserInfo, userId } from "../atom/Atom";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { ButtonUi } from "../Menu";

export const ButtonsPageTask = () => {
  const [useId, setUseId] = useRecoilState(userId);
  const useInfo = useRecoilValue(UserInfo);
  const history = useHistory();
  return (
    <ButoonNav>
      {/* <Link to={`/projects/${useInfo._id}`}> */}
      <ButtonUi
        onClick={() => {
          history.push(`/projects/${useInfo._id}`);
        }}
      >
        הפרוייקטים של המדור
      </ButtonUi>
      {/* </Link> */}
      {/* <Link to="/createTasks"> */}
      <ButtonUi
        onClick={() => {
          history.push(`/createTasks`);
        }}
      >
        ליצירת משימה חדשה
      </ButtonUi>
      {/* </Link> */}
    </ButoonNav>
  );
};
export const ButoonNav = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
