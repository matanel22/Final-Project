import { Button, Modal } from "@mui/material";
import styled, { keyframes } from "styled-components";
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
        <S>
          <p> ברצונך להתנתק</p>
          <Button
            variant="outlined"
            onClick={() => {
              localStorage.removeItem("tok");
              history.push("/login");
            }}
          >
            כן
          </Button>
          <Button
            variant="outlined"
            onClick={() => {
              props.setOpenModal(false);
            }}
          >
            ביטול
          </Button>
        </S>
      </WrapperModal>
    </Modal>
  );
};
export const dropdown = keyframes`

	0% {
		animation-timing-function: ease-in;
		opacity: 0;
		transform: translateY(-250px);
	}

	38% {
		animation-timing-function: ease-out;
		opacity: 1;
		transform: translateY(0);
	}

	55% {
		animation-timing-function: ease-in;
		transform: translateY(-65px);
	}

	72% {
		animation-timing-function: ease-out;
		transform: translateY(0);
	}

	81% {
		animation-timing-function: ease-in;
		transform: translateY(-28px);
	}

	90% {
		animation-timing-function: ease-out;
		transform: translateY(0);
	}

	95% {
		animation-timing-function: ease-in;
		transform: translateY(-8px);
	}

	100% {
		animation-timing-function: ease-out;
		transform: translateY(0);
	}

`;
const WrapperModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  // transform: translate(-50%, -50%);
  background: #fff;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  z-index: 1000;
  animation: ${dropdown} 2s ease 0s 1 normal forwards;
`;
const S = styled.div`
  width: 20vw;
  font-size: 1.5rem;
  background-color: white;
`;
