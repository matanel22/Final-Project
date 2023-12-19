import React, { useEffect, useState } from "react";
import { IFormMission } from "./TasksList";
import TaskModal from "./TaskModal";
interface IProps {
  dataMission: IFormMission[];
}
const RemindUser: React.FC<IProps> = ({ dataMission }) => {
  // Assuming Task is the type of your task objects
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [TasksCloseCompletion, setTasksCloseCompletion] = useState<string[]>(
    []
  );
  const closeModal = () => {
    setModalIsOpen(false);
  };
  useEffect(() => {
    // Check tasks for approaching end dates
    const now = new Date();

    const approachingTasks = dataMission.filter((task) => {
      // Assuming endDate is a valid Date object in your task
      const endDate = new Date(task.endDate);
      const timeDifferenceInHours =
        (endDate.getTime() - now.getTime()) / (1000 * 60 * 60);

      // Adjust the threshold as needed (e.g., 24 for one day before)
      return timeDifferenceInHours <= 24;
    });

    // Display a message to the user if there are approaching tasks
    console.log(approachingTasks);

    if (approachingTasks.length > 0) {
      const newApproaching = approachingTasks.map(
        (approaching) => approaching.discrption
      );
      setTasksCloseCompletion(newApproaching);

      setModalIsOpen(true);
    }
  }, [dataMission]);

  // Render your component UI
  useEffect(() => {
    console.log(TasksCloseCompletion);
  }, [TasksCloseCompletion]);
  return (
    <TaskModal
      modalIsOpen={modalIsOpen}
      closeModal={closeModal}
      TasksCloseCompletion={TasksCloseCompletion}
    ></TaskModal>
  );
};

export default RemindUser;
