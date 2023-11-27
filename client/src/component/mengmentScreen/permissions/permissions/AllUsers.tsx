import { useRecoilState, useRecoilValue } from "recoil";
// import { allUsers } from "../atom/Atom";
import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import { AddUser } from "./AddUser";
// import axios from "axios";
// import { ReactComponent as Editng } from "../../folder svg/editng.svg";
// import { ReactComponent as Editng } from "./"

interface IProps {
  openListUsers: boolean;
}
export interface AllUsersPROPS {
  permission: boolean;
  persunalNum: number;
  name: string;
  id: string;
}

export const users: AllUsersPROPS[] = [
  { id: "1", name: "תומר", permission: true, persunalNum: 11111 },
  { id: "2", name: "אלמוג", permission: true, persunalNum: 22222 },
  { id: "3", name: "מתנאל", permission: false, persunalNum: 33333 },
];

export const AllUsers = () => {
  const [listUsers, setListUsers] = useState(users);
  const [selectedItem, setSelectedItem] = useState("");
  const [editOption, setEditOption] = useState({ open: false, ind: 0 });

  const handleChange = (index: number, selectedValue: any) => {
    console.log(selectedValue);

    setSelectedItem(selectedValue);
    const updatedUsers = listUsers.map((user: AllUsersPROPS, i: number) =>
      i === index ? { ...user, permission: selectedValue === "מנהל" } : user
    );
    setListUsers(updatedUsers);
  };
  const handelNameChenge = (index: number) => {
    setEditOption({ ...editOption, open: !editOption.open, ind: index });
  };
  const handelDelte = (id: string) => {
    const deleteUser = listUsers.filter((user) => {
      return user.id !== id;
    });
    setListUsers(deleteUser);
  };
  //   const handleUpdateClick = (updateUserById: string, namePermission: string) => {};
  return (
    <>
      <Container>
        {listUsers.map((list: AllUsersPROPS, index: number) => (
          <WrapperListNameUsers key={list.id}>
            <ListItem
            // onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            //   handelNameChenge(e.target.value);
            // }}
            >
              <RightColumn>שם מלא: {list.name}</RightColumn>

              <div> מספר אישי: {list.persunalNum}</div>
            </ListItem>
            {editOption.open && editOption.ind == index ? (
              <SelectStyled
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                  handleChange(index, e.target.value);
                }}
                value={list.permission ? "מנהל" : "משתמש"}
              >
                <OptionStyled value={"משתמש"}>{"משתמש"}</OptionStyled>
                <OptionStyled value={"מנהל"}>{"מנהל"} </OptionStyled>
              </SelectStyled>
            ) : (
              <RightColumn> {list.permission ? "מנהל" : "משתמש"}</RightColumn>
            )}
            <UpdateUserButton
              onClick={() => {
                handelNameChenge(index);
              }}
            >
              {editOption.open && editOption.ind == index ? "שמור" : "ערוך"}
            </UpdateUserButton>
            <DelButton
              onClick={() => {
                handelDelte(list.id);
              }}
            >
              מחק
            </DelButton>
          </WrapperListNameUsers>
        ))}
        {/* <AddUser listUsers={listUsers} setListUsers={setListUsers} /> */}
      </Container>
    </>
  );
};
const WrapperListNameUsers = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px;
  border: 2px solid;
  // border-radius: 40px;
`;
const Container = styled.div`
  // position: fixed;

  margin-top: 5rem;
  // margin-right: 2rem;
  background-color: #d5e2e4;
  // left: 50%;
  width: 70vw;
  height: 70vh;
  direction: rtl;
  overflow-y: auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const ListItem = styled.div`
  color: black;
`;
const RightColumn = styled.div`
  color: black;
  font-size: 20px;
  // border: 2px solid;
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
export const SelectStyled = styled.select`
  // padding: 10px;
  font-size: 16px;
  margin-right: 2rem;
  border: 2px solid #3498db;
  border-radius: 5px;
  outline: none;
  background-color: #f1f1f1;
  color: #333;
  // margin-bottom: 20px;
  padding: 10px 20px;
  width: 10rem;
`;

export const OptionStyled = styled.option`
  background-color: #f1f1f1;
`;
const UpdateUserButton = styled(Button)`
  background-color: #3498db;
  color: #fff;
  margin-right: 2rem;
  &:hover {
    background-color: #2980b9;
  }
`;

const DelButton = styled(Button)`
  background-color: red;
  color: #fff;
  margin-right: 2rem;
  &:hover {
    background-color: red;
  }
`;
const Table = styled.table`
  border-collapse: collapse;
  width: 100%;
  margin: 20px 0;
  font-family: Arial, sans-serif;
  border: 1px solid #dddddd;
`;

const TableHeader = styled.th`
  background-color: #f2f2f2;
  border: 1px solid #dddddd;
  padding: 10px;
  text-align: left;
`;

const TableRow = styled.tr`
  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

const TableCell = styled.td`
  border: 1px solid #dddddd;
  padding: 10px;
  text-align: left;
`;
