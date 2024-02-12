import React, { useState } from "react";
import styled, { keyframes } from "styled-components";

// Define keyframes for the loading animation
const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
`;

// Define props type for the Button component
interface ButtonProps {
  isLoading: boolean;
}

// Styled button component
const Button = styled.button<ButtonProps>`
  background-color: ${({ isLoading }) => (isLoading ? "#ccc" : "#007bff")};
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  cursor: ${({ isLoading }) => (isLoading ? "not-allowed" : "pointer")};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ isLoading }) => (isLoading ? "#ccc" : "#0056b3")};
  }

  /* Loading animation */
  &:after {
    content: "";
    width: 20px;
    height: 20px;
    border: 2px solid #fff;
    border-top-color: #007bff;
    border-radius: 50%;
    display: ${({ isLoading }) => (isLoading ? "inline-block" : "none")};
    animation: ${spin} 1s linear infinite;
    margin-left: 5px;
    vertical-align: middle;
  }
`;
interface IPropsButton {
  textButton: string;
}
const ButtonLoading = ({ textButton }: IPropsButton) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleClick = () => {
    setIsLoading(true);

    // Simulate loading after one second
    setTimeout(() => {
      setIsLoading(false);
    }, 4000);
  };

  return (
    <div>
      <Button type="submit" isLoading={isLoading} onClick={handleClick}>
        {isLoading ? "Loading..." : textButton}
      </Button>
    </div>
  );
};

export default ButtonLoading;
