import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { useRecoilState } from "recoil";

import { userId } from "../atom/Atom";
import styled from "styled-components";
import React, { useEffect, useState } from "react";

export const ButtonsPageTask = () => {
  const [useId, setUseId] = useRecoilState<string>(userId);
  useEffect(() => {
    console.log("11111", useId);
  }, []);

  return (
    <ButoonNav>
      <Link to={`/projects/${useId}`}>
        <Button
          color="success"
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          הפרוייקטים של המדור
        </Button>
      </Link>
      <Link to="/createTasks">
        <Button
          variant="contained"
          color="success"
          sx={{ mt: 3, mb: 2 }}
          // onClick={sendingToTheCreation}
        >
          ליצירת משימה חדשה
        </Button>
      </Link>
    </ButoonNav>
  );
};
export const ButoonNav = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;
