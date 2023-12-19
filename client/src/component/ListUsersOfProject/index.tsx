import React, { useState } from "react";
import MouseClick from "../../svg/mouseClick.svg";
import styled from "styled-components";
interface IProps {
  staff: string[];
}
export function ListUsersOfProject({ staff }: IProps) {
  const [showArray, setShowArray] = useState(false);

  const handleMouseEnter = () => {
    setShowArray(true);
  };

  const handleMouseLeave = () => {
    setShowArray(false);
  };

  return (
    <div>
      <p onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
        <Mouse src={MouseClick}></Mouse>
      </p>
      {showArray && (
        <div>
          {staff.map((item) => (
            <ShowUser>{item}</ShowUser>
          ))}
        </div>
      )}
    </div>
  );
}

const Mouse = styled.img``;
const ShowUser = styled.p`
  position: absolute;
`;
