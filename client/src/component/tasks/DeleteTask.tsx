import { Box, Button, Modal } from "@mui/material";
import React, { Dispatch, useState } from "react";
import styled from "styled-components";

interface IProps {
  openModal: boolean;
  setOpenModal: Dispatch<React.SetStateAction<boolean>>;
  removeMission(id: string): void;
  sendingId: string;
}
export const DeleteTask = (props: IProps) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => setOpen(false);
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <>
      <Modal
        open={props.openModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClose={handleClose}
      >
        <Box sx={style}>
          <Title> ברצונך למחוק</Title>
          <Button
            variant="outlined"
            // color="success"
            onClick={() => {
              props.removeMission(props.sendingId);
              props.setOpenModal(false);
            }}
          >
            כן
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={() => {
              props.setOpenModal(false);
            }}
          >
            לא
          </Button>
        </Box>
      </Modal>
    </>
  );
};

const Title = styled.p`
  margin-right: 10px;
`;
