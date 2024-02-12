import React, { Dispatch, useEffect, useState } from "react";
import { IFormMission } from "./TasksList";
import TaskModal from "./TaskModal";
type MessageModalState = {
  stap: boolean;
  openIndex: number;
};

interface IProps {
  // dataMission: IFormMission[];
  remarks: string;
  endDate: Date;
  openMessageModal: boolean;
  setOpenMessageModal: Dispatch<React.SetStateAction<MessageModalState>>;
  index: number;
  TasksCloseCompletion: number;
  setTasksCloseCompletion: Dispatch<React.SetStateAction<number>>;
}

const RemindUser: React.FC<IProps> = ({
  remarks,
  endDate,
  openMessageModal,
  setOpenMessageModal,
  index,
  TasksCloseCompletion,
  setTasksCloseCompletion,
}) => {
  // Assuming Task is the type of your task objects
  const [modalIsOpen, setModalIsOpen] = useState(false);
  // const [TasksCloseCompletion, setTasksCloseCompletion] = useState(0);
  const closeModal = () => {
    setModalIsOpen(false);
    setOpenMessageModal({ stap: false, openIndex: 0 });
  };
  useEffect(() => {
    const now = new Date();

    const timeDifferenceInHours =
      (endDate.getTime() - now.getTime()) / (1000 * 60 * 60);
    setTasksCloseCompletion(timeDifferenceInHours);

    setOpenMessageModal({ stap: openMessageModal, openIndex: index });
  }, [openMessageModal]);

  return (
    // <></>
    <TaskModal
      modalIsOpen={openMessageModal}
      closeModal={closeModal}
      TasksCloseCompletion={TasksCloseCompletion}
      remarks={remarks}
      endDate={endDate}
    ></TaskModal>
  );
};

export default RemindUser;
