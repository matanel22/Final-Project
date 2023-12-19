import { Modal } from "@mui/material";
import styled from "styled-components";
import React, { Dispatch, useState } from "react";
import { NavButton } from "../UI/NavButton";
import { useHistory } from "react-router-dom";

interface IProps {
  // removeUser(id: string): void;
  openModal: boolean;
  setOpenModal: Dispatch<React.SetStateAction<boolean>>;
}
export const LogOutUser = (props: IProps) => {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);
  const history = useHistory();

  return (
    <Modal
      open={props.openModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onClose={handleClose}
    >
      <WrapperModal>
        <p> ברצונך להתנתק</p>
        <NavButton
          onClick={() => {
            localStorage.removeItem("tok");
            history.push("/login");
          }}
        >
          כן
        </NavButton>
        <NavButton
          onClick={() => {
            props.setOpenModal(false);
          }}
        >
          ביטול
        </NavButton>
      </WrapperModal>
    </Modal>
  );
};

const WrapperModal = styled.div`
  font-size: 1.5rem;
  width: 20vw;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  margin: 50px;
  background-color: white;
`;
