import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { GetAllUsers } from "./GetAllUsers";
export const Menu = () => {
  const [openListUsers, setOpenListUsers] = useState(false);
  return (
    <WarpperMenu>
      <button
        onClick={() => {
          setOpenListUsers(true);
        }}
      >
        משתמשים
      </button>
      <GetAllUsers openListUsers={openListUsers} />
    </WarpperMenu>
  );
};
const WarpperMenu = styled.div`
position absolute;
`;
