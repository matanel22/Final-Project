import React, { useState, useEffect, Dispatch } from "react";
import { useHistory } from "react-router-dom";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { idPrj } from "../atom/Atom";
import SimpleAlert from "./MessMui";

interface MessageBool {
  isVisible: boolean;
}
interface NotifictionMess {
  message: string;
  setSuccessCration: Dispatch<React.SetStateAction<boolean>>;
  successCration: boolean;
  url: string;
  typeAlert: string;
}

const SuccessMessage = ({
  message,
  setSuccessCration,
  successCration,
  url,
  typeAlert,
}: NotifictionMess) => {
  const [isVisible, setIsVisible] = useState(true);

  let histury = useHistory();
  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
      setSuccessCration(false);
      histury.push(url);
    }, 3000);

    return () => clearTimeout(timer);
  }, [isVisible]);

  return (
    <>
      {successCration && (
        <SuccessMessageWrapper isVisible={isVisible}>
          <AlertMessage>
            {" "}
            <SimpleAlert message={message} typeAlert={typeAlert} />
          </AlertMessage>
        </SuccessMessageWrapper>
      )}
    </>
  );
};

export default SuccessMessage;

const SuccessMessageWrapper = styled.div<MessageBool>`
  // background-color: #71b7f0;
  padding: 10px;
  position: fixed;

  width: 100%;

  border-radius: 5px;
  bottom: 1rem;
  left: 1rem;
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
`;
const AlertMessage = styled.div`
  width: 20%;
  background-color: #333;
`;
