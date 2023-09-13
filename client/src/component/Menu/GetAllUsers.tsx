import { useRecoilState, useRecoilValue } from "recoil";
import { allUsers } from "../atom/Atom";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

interface IProps {
  openListUsers: boolean;
}

export const GetAllUsers = (props: IProps) => {
  const [listUsers, setListUsers] = useRecoilState(allUsers);
  const [selectedItem, setSelectedItem] = useState("");

  const handleChange = (index: number, selectedValue: any) => {
    console.log(selectedValue);
    console.log(listUsers);

    setSelectedItem(selectedValue);
    // Update the array of users based on the selected option
    const updatedUsers: any = listUsers.map((user, i) =>
      i === index ? { ...user, permissions: selectedValue === "מנהל" } : user
    );
    setListUsers(updatedUsers);
  };

  const handleUpdateClick = (
    updateUserById: string,
    namePermission: string
  ) => {
    let url = `http://localhost:3001/api/routs/router/updatePermissionUser`;
    axios.post(url, { namePermission, updateUserById }).then((res) => {
      console.log(res.data);
    });
  };
  return (
    <>
      {props.openListUsers && (
        <Container>
          {listUsers.map((list: any, index) => (
            <WrapperListNameUsers>
              <RightColumn>שם מלא:</RightColumn>
              <ListItem>{list.name}</ListItem>;
              <SelectStyled
                value={list.permissions ? "מנהל" : "משתמש"}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  handleChange(index, e.target.value);
                }}
              >
                <OptionStyled>{"משתמש"}</OptionStyled>
                <OptionStyled>{"מנהל"} </OptionStyled>
              </SelectStyled>
              <BlueButton
                onClick={() => {
                  handleUpdateClick(list._id, selectedItem);
                }}
              >
                עדכן
              </BlueButton>
              <DelButton>מחק</DelButton>
            </WrapperListNameUsers>
          ))}
        </Container>
      )}
    </>
  );
};
const WrapperListNameUsers = styled.div`
  display: flex;
  justify-content: space-between; /* Align button to the right */
  align-items: center;
  margin: 10px;
`;
const Container = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  width: 40vw;
  height: 50vh;
  background: linear-gradient(
    0deg,
    rgba(45, 91, 253, 1) 0%,
    rgba(240, 240, 240, 0.9725140056022409) 100%
  );
  overflow-y: auto;
  transform: translate(-50%, -50%);
  // background-color: #fff;
  // padding: 20px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const ListItem = styled.div`
  color: black;
`;
const RightColumn = styled.div`
  color: black;
`;
const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  // background-color: #3498db;
  // color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  // &:hover {
  //   background-color: #2980b9;
  // }
`;
const SelectStyled = styled.select`
  // padding: 10px;
  font-size: 16px;

  border: 2px solid #3498db;
  border-radius: 5px;
  outline: none;
  background-color: #f1f1f1;
  color: #333;
  // margin-bottom: 20px;
  padding: 10px 20px;
  width: 10rem;
`;

const OptionStyled = styled.option`
  background-color: #f1f1f1;
`;
const BlueButton = styled(Button)`
  background-color: #3498db;
  color: #fff;

  &:hover {
    background-color: #2980b9;
  }
`;

const DelButton = styled(Button)`
  background-color: red;
  color: #fff;

  &:hover {
    background-color: red;
  }
`;
