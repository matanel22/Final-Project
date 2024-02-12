import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { useHistory } from "react-router-dom";
import { UserInfo, userId } from "../atom/Atom";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { ButtonUi } from "../Menu";
import axios from "axios";

interface IProps {
  urlNav1: string;
  urlNav2: string;
}

export const ButtonsPageTask = ({ urlNav1, urlNav2 }: IProps) => {
  const [useId, setUseId] = useRecoilState(userId);
  const [userInfo, setUserInfo] = useRecoilState(UserInfo);

  const history = useHistory();
  useEffect(() => {
    let url = "http://localhost:3001/api/routs/router/userInfo";
    console.log("1111111111");
    axios
      .get(url, { headers: { "x-api-key": localStorage["tok"] } })
      .then((res) => {
        setUserInfo(res.data[0]);
      });
  }, [!userInfo]);
  return (
    <ButoonNav>
      {urlNav1 !== "" && (
        <ButtonUi
          onClick={() => {
            history.push(urlNav1);
          }}
        >
          הפרוייקטים של המדור
        </ButtonUi>
      )}
      {/* </Link> */}
      {/* <Link to="/createTasks"> */}

      {urlNav2 !== "" && (
        <ButtonUi
          onClick={() => {
            history.push(urlNav2);
          }}
        >
          ליצירת משימה חדשה
        </ButtonUi>
      )}
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
