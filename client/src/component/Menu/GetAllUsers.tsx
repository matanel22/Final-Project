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
  const [editOption, setEditOption] = React.useState({ open: false, ind: 0 });

  useEffect(() => {
    let url = "http://localhost:3001/api/routs/router/allUsers";
    axios.get(url).then((res) => {
      setListUsers(res.data);
    });
  }, []);
  const handelDeleteUser = async (id: string) => {
    let url = `http://localhost:3001/api/routs/router/deletedUser`;
    await axios
      .post(url, { id })
      .then((res) => {
        setListUsers((prevUsers) => {
          const updatedUsers = prevUsers.filter((user) => user._id !== id);
          return updatedUsers;
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    console.log(listUsers);
  }, [listUsers]);

  const handleChange = (index: number, selectedValue: any) => {
    setSelectedItem(selectedValue);
    const updatedUsers = listUsers.map((user: any, i: number) =>
      i === index ? { ...user, permissions: selectedValue === "מנהל" } : user
    );
    setListUsers(updatedUsers);
  };
  const handelNameChenge = (index: number) => {
    setEditOption({ ...editOption, open: !editOption.open, ind: index });
  };

  const handelCancel = (index: number) => {
    setEditOption({ ...editOption, open: !editOption.open, ind: index });
  };

  const handleUpdateClick = (
    updateUserById: string,
    namePermission: string,
    index: number
  ) => {
    setSelectedItem(namePermission);

    let url = `http://localhost:3001/api/routs/router/updatePermissionUser`;
    console.log(namePermission);

    axios.post(url, { namePermission, updateUserById }).then((res) => {
      const updatedUsers = listUsers.map((user: any, i: number) =>
        i === index ? { ...user, permissions: namePermission === "מנהל" } : user
      );
      setListUsers(updatedUsers);
      setEditOption({ ...editOption, open: !editOption.open });
    });
  };
  return (
    <>
      {props.openListUsers && (
        <Container>
          {listUsers.map((list: any, index) => (
            <WrapperListNameUsers>
              {" "}
              <RightColumn>שם מלא:</RightColumn>
              <ListItem>{list.name}</ListItem>
              {editOption.open && editOption.ind === index ? (
                <SelectStyled
                  value={list.permissions ? "מנהל" : "משתמש"}
                  onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
                    handleChange(index, e.target.value);
                  }}
                >
                  <OptionStyled>{"משתמש"}</OptionStyled>
                  <OptionStyled>{"מנהל"} </OptionStyled>
                </SelectStyled>
              ) : (
                <ListItem>{list.permissions ? "מנהל" : "משתמש"}</ListItem>
              )}
              <div>
                <BlueButton
                  onClick={() => {
                    {
                      editOption.open && editOption.ind === index
                        ? handleUpdateClick(list._id, selectedItem, index)
                        : handelNameChenge(index);
                    }
                  }}
                >
                  {editOption.open && editOption.ind === index
                    ? "שמור"
                    : "עדכן"}
                </BlueButton>

                {editOption.open && editOption.ind === index && (
                  <DelButton
                    onClick={() => {
                      handelCancel(index);
                    }}
                  >
                    ביטול
                  </DelButton>
                )}
              </div>
            </WrapperListNameUsers>
          ))}
        </Container>
      )}
    </>
  );
};
const Container = styled.div`
  position: fixed;
  background-color: aliceblue;
  top: 50%;
  left: 50%;
  width: 40vw;
  height: 50vh;
  border-radius: 30px;
  overflow-y: auto;
  transform: translate(-50%, -50%);
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const WrapperListNameUsers = styled.div`
  margin: 10px;
  padding: 10px;
  border: 1px solid #ddd;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const RightColumn = styled.div`
  color: black;
`;

const ListItem = styled.div`
  color: black;
`;

const Button = styled.button`
  padding: 10px 20px;
  font-size: 16px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
`;

const SelectStyled = styled.select`
  font-size: 16px;
  border: 2px solid #3498db;
  border-radius: 5px;
  outline: none;
  background-color: #f1f1f1;
  color: #333;
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
