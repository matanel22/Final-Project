import React, { useState } from "react";
import MouseClick from "../../svg/mouseClick.svg";
import styled from "styled-components";
interface IProps {
  staff: string[];
}
export function ListUsersOfProject({ staff }: IProps) {
  const [showArray, setShowArray] = useState(false);

  const handleMouseEnter = () => {
    setShowArray(!showArray);
  };

  // const handleMouseLeave = () => {
  //   setShowArray(false);
  // };
  return (
    <div>
      {showArray && (
        <WarpperUsers>
          {staff.map((item, index) => (
            <ShowUser>{`${item} `}</ShowUser>
          ))}
        </WarpperUsers>
      )}
      {/* <p onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}> */}
      <Mouse onClick={handleMouseEnter} src={MouseClick}></Mouse>
      {/* </p> */}
    </div>
  );
}

const Mouse = styled.img`
  cursor: pointer;
`;
const WarpperUsers = styled.div`
  // background-color: red;
  // position: fixed;
  // background: #fff;
  // padding: 20px;
  background: rgba(224, 224, 224, 1);
  border-radius: 8px;
  display: flex;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
`;
const ShowUser = styled.p`
  z-index: auto;
  margin-right: 8px;
`;
