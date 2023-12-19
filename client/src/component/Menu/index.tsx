import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { GetAllUsers } from "./GetAllUsers";

export const Menu = () => {
  const [openListUsers, setOpenListUsers] = useState(false);

  return (
    <WarpperMenu>
      <ButtonUi
        onClick={() => {
          setOpenListUsers(!openListUsers);
        }}
      >
        ניהול משתמשים
      </ButtonUi>

      <GetAllUsers openListUsers={openListUsers} />
      {/* <GetAllUsers openListUsers={openListUsers} /> */}
    </WarpperMenu>
  );
};
const WarpperMenu = styled.div`
  // position absolute;
  display: flex;
`;
const ButtonBsic = styled.button`
display:flex;
align-items:center;
text-align center;
justify-content: center;
background:#fafafa;
box-sizing: border-box;
cursor :pointer
font-size:1rem;
font-weight:550;
`;

export const ButtonUi = styled(ButtonBsic)`
  color: #5b7fff;
  border: 1px solid #547fff;
  min-width: 11.5rem;
  margin-top: 1.2rem;
  height: 2.625rem;
  transition: font-size 0.25s ease;
  &:hover {
    font-size: 1.25rem;
    cursor: pointer;
  }
`;
