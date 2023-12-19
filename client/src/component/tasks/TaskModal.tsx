import React, { useEffect } from "react";
import Modal from "react-modal";
import styled from "styled-components";
interface IProps {
  modalIsOpen: boolean;
  closeModal: () => void;
  TasksCloseCompletion: string[];
}
const TaskModal = ({
  modalIsOpen,
  closeModal,
  TasksCloseCompletion,
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
      <div>
        <h2>משימות לקראת סיום</h2>
        {TasksCloseCompletion.map((taskClose) => (
          <p>
            תיאור משימה בשם <Span>{taskClose}</Span> תאריך סיום שלה עוד פחות מ24
            שעות
          </p>
        ))}

        <button onClick={closeModal}>Close</button>
      </div>
    </Modal>
  );
};

export default TaskModal;

const Span = styled.span`
  font-size: x-large;
`;
