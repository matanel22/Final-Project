import styled from "styled-components";
import homePage from "../image/homepage.png";
import React from "react";

interface IProps {
  children: React.ReactNode;
}
export const ShellForForms = ({ children }: IProps) => {
  return (
    <WarpperForms style={{ backgroundImage: `url(${homePage})` }}>
      {children}
    </WarpperForms>
  );
};

const WarpperForms = styled.div`
  display: flex;

  background-size: cover;
  background-position: center;
  height: 100vh;
  width: 100vw;
`;
