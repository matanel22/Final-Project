import { Modal } from "@mui/material";
import styled from "styled-components";
import React, { Dispatch, useState } from "react";
import { NavButton } from "../UI/NavButton";
import { useRecoilState } from "recoil";
import { userId } from "../atom/Atom";

interface IProps {
  removeUser(id: string): void;
  openModal: boolean;
  setOpenModal: Dispatch<React.SetStateAction<boolean>>;
}
export const LogOutUser = (props: IProps) => {
  const [open, setOpen] = React.useState(true);
  const handleClose = () => setOpen(false);
  const [useId, setUseId] = useRecoilState<string>(userId);

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
            props.removeUser(useId);
          }}
        >
          כן
        </NavButton>
        <NavButton
          onClick={() => {
            props.setOpenModal(false);
          }}
        >
          לא
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
