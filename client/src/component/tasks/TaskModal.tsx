import dayjs from "dayjs";
import React, { useEffect } from "react";
import Modal from "react-modal";
import styled, { keyframes } from "styled-components";
interface IProps {
  modalIsOpen: boolean;
  closeModal: () => void;
  TasksCloseCompletion: number;
  remarks: string;
  endDate: Date;
}
const TaskModal = ({
  modalIsOpen,
  closeModal,
  TasksCloseCompletion,
  remarks,
  endDate,
}: IProps) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={{
        content: {
          width: "300px",
          margin: "auto",
          borderRadius: "8px",
          boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
          height: "200px",
        },
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
      }}
    >
      <WrapperAnimtion>
        <Span>התראות</Span>
        {TasksCloseCompletion > 0 ? (
          <Parm>אין התראות חדשות</Parm>
        ) : (
          <Parm>{` שים לב לתאריך סיום אמור להסתיים בקרוב ${dayjs(
            endDate
          ).format("MMM D YYYY")}`}</Parm>
        )}

        {/* {TasksCloseCompletion.map((taskClose) => ( */}
        <Span>הערות</Span>
        <Parm>{remarks}</Parm>
        {/* ))} */}

        <button onClick={closeModal}>סגור</button>
      </WrapperAnimtion>
    </Modal>
  );
};

export default TaskModal;

const Span = styled.span`
  font-size: x-large;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const dropdown = keyframes`
  from {
        max-height: 0px;
        opacity: 0;
      }
    
      to {
        max-height: min-content;
        opacity: 1;
      }
`;

const WrapperAnimtion = styled.div`
  animation: ${dropdown} 0.5s ease-in-out;
`;

const Parm = styled.p`
  font-size: larger;

  word-break: normal;
  overflow-wrap: break-word;
`;
