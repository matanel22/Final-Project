import React, { useState, useEffect, Dispatch } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { idPrj } from "../atom/Atom";

interface MessageBool {
  isVisible: boolean;
}
interface NotifictionMess {
  message: string;
  setSuccessCrationTask: Dispatch<React.SetStateAction<boolean>>;
  successCrationTask: boolean;
}

const SuccessMessageWrapper = styled.div<MessageBool>`
  background-color: #4caf50;
  color: #fff;
  padding: 10px;
  position: fixed;
  top: 10px;
  right: 10px;
  border-radius: 5px;
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
`;

const SuccessMessage = ({
  message,
  setSuccessCrationTask,
  successCrationTask,
}: NotifictionMess) => {
  const [isVisible, setIsVisible] = useState(false);
  const [ID, setId] = useRecoilState(idPrj);

  let histury = useHistory();
  useEffect(() => {
    // Display the message for 3 seconds
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setSuccessCrationTask(false);
      histury.push("tasks/" + ID);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {successCrationTask && (
        <SuccessMessageWrapper isVisible={isVisible}>
          {message}
        </SuccessMessageWrapper>
      )}
    </>
  );
};

export default SuccessMessage;
