import React from "react";
import styled from "styled-components";

interface OvalButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

const OvalButton = ({ onClick, children }: OvalButtonProps) => {
  return <Button onClick={onClick}>{children}</Button>;
};

const Button = styled.button`
  background-color: #bd2828;
  color: white;
  border: none;
  height: 80px;
  width: 80px;
  margin-top: 20px;
  padding: 15px 30px;
  border-radius: 80px;
  cursor: pointer;
  font-size: 1 rem;
  text-align: center;
  box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.25);
  margin: 20px;
`;

export default OvalButton;
