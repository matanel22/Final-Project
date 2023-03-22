import React from "react";
import styled from "styled-components";

interface ButtonProps {
  onClick: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  children: string;
}

export const NavButton: React.FC<ButtonProps> = ({
  onClick,
  disabled,
  type = "button",
  children,
}) => {
  return (
    <StyledButton onClick={onClick} disabled={disabled} type={type}>
      {children}
    </StyledButton>
  );
};

const StyledButton = styled.button<{ disabled?: boolean }>`
  background-color: ${(props) => (props.children === "כן" ? "red" : "#5cb85c")};
  color: black;
  font-size: 1rem;
  padding: 0.5rem 1rem;
  border: 2px solid black;
  border-radius: 4px;
  cursor: pointer;
  margin: 20px;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  &:hover {
    background-color: #449d44;
  }
`;
