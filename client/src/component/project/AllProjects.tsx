import { AppBar, Avatar, Box, Button, Modal, Toolbar } from "@mui/material";
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import ProjectList from "./ProjectList";
import { useRecoilState, useRecoilValue } from "recoil";
import {
  AllProjectData,
  UserInfo,
  allUsers,
  searchPro,
  userId,
  userName,
} from "../atom/Atom";
import styled, { css } from "styled-components";
import { useHistory, useParams } from "react-router-dom";

import { ButtonUi, Menu } from "../Menu";

import UserSvg from "../../svg/user.svg";
import UserProf from "../../svg/user.svg";
import { LogOutUser } from "./LogOutUser";
import YourComponent from "../searchField";
import SimpleAlert from "../MessegeToUser/MessMui";

export interface IProps {
  _id: string;
  readonly nameProject: string;
  // staff: string;
  staff: string[];
  projectNumber: string;
  readonly client: string;
  statusProject: string;
  amountOfUsers: string;
}
export interface MyObject {
  id: string;
  // Other properties if needed
}
const AllProjects = () => {
  const [dataProject, setDataProject] = useRecoilState(AllProjectData);
  const filteredNames = useRecoilValue(searchPro);
  const [openModal, setOpenModal] = useState(false);
  const histury = useHistory();

  const articleId: MyObject = useParams();
  // const userInfo = useRecoilValue(UserInfo);
  // const [listUsers, setListUsers] = useRecoilState(allUsers);
  const [userInfo, setUserInfo] = useRecoilState(UserInfo);

  const [listUsers, setListUsers] = useRecoilState(allUsers);

  useEffect(() => {
    let url = "http://localhost:3001/api/routs/router/userInfo";
    console.log("1111111111");
    axios
      .get(url, { headers: { "x-api-key": localStorage["tok"] } })
      .then((res) => {
        setUserInfo(res.data[0]);
      });
  }, [!userInfo]);

  useEffect(() => {
    if (filteredNames) {
      let url = "http://localhost:3001/api/routs/router/organizationFind";
      axios.post(url, { filteredNames }).then((res) => {
        setDataProject(res.data);
      });
    } else {
      const fetch = async (id: string) => {
        try {
          let url = "http://localhost:3001/api/routs/router/allProjects";
          await axios.post(url, { id }).then((response) => {
            const updatedData = response.data.map(
              (proj: any, index: number) => {
                const userIdToName = new Map(
                  listUsers.map((user) => [user._id, user.name])
                );
                const staff = proj.staff
                  .map((userId: any) => userIdToName.get(userId))
                  .filter(Boolean);

                return {
                  ...proj,
                  staff,
                };
              }
            );

            setDataProject(updatedData);
          });
        } catch (error) {
          console.log(error);
        }
      };

      fetch(articleId.id);
    }
  }, [filteredNames]);

  return (
    <StyleHome>
      {/* <SimpleAlert /> */}
      <AppBar
        sx={{
          flexGrow: 1,
          minHeight: 100,
        }}
        position="static"
      >
        <WidthTable>
          <div>
            {" "}
            <UserWelcome> {`ברוך הבא ${userInfo.name}`}</UserWelcome>
            <ButtonUi
              onClick={() => {
                setOpenModal(true);
              }}
            >
              התנתקות
            </ButtonUi>
          </div>
          <YourComponent />
          <div>
            {userInfo.permissions && <Menu />}

            <LogOutUser
              openModal={openModal}
              setOpenModal={setOpenModal}
            ></LogOutUser>
            {userInfo.permissions && (
              <ButtonUi
                onClick={() => {
                  histury.push("/createProject");
                }}
              >
                צור פרויקט
              </ButtonUi>
            )}
          </div>
        </WidthTable>
      </AppBar>
      <ProjectList dataProject={dataProject} valideRoleId={articleId} />;
    </StyleHome>
  );
};

export default AllProjects;

const WidthTable = styled.div`
  width: 100vw;
  margin-top: 0rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const StyleHome = styled.div`
  ${css`
    @media (max-width: 768px) {
      padding: 5px;

      overflow: hidden;
    }
  `} // background-color: blue;
`;
const User = styled.img`
  width: 80px;
  height: 80px;
`;
const UserWelcome = styled.div`
  font-size: 1.5rem;
`;

const MenuBar = styled.img``;
