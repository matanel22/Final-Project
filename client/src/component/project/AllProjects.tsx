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
import styled from "styled-components";
import { useHistory, useParams } from "react-router-dom";
import OvalButton from "../UI/ButtonStyle";
import { ButtonUi, Menu } from "../Menu";
import menu from "../../svg/menu.svg";
import { LogOutUser } from "./LogOutUser";
import YourComponent from "../searchField";
export interface IProps {
  _id: string;
  readonly nameProject: string;
  staff: string;
  userId: string;
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
  const findingSearch = useRecoilValue(searchPro);
  const [validata, setValidata] = useState(false);

  const [NY, setNameUser] = useRecoilState<string>(userName);
  const [validPremissionUsers, setValidPremissionUsers] = useState(false);
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const [userDelete, setUserDelete] = useState("");
  const [openModal, setOpenModal] = useState(false);
  const histury = useHistory();
  const [openMenu, setOpenMenu] = useState(false);
  const articleId: MyObject = useParams();
  const userInfo = useRecoilValue(UserInfo);
  const [listUsers, setListUsers] = useRecoilState(allUsers);

  useEffect(() => {
    let url = "http://localhost:3001/api/routs/router/allUsers";
    axios.get(url).then((res) => {
      setListUsers(res.data);
    });

    const fetch = async (id: string) => {
      try {
        let url = "http://localhost:3001/api/routs/router/allProjects";
        await axios.post(url, { id }).then((response) => {
          console.log(response.data);
          setValidata(true);

          setDataProject(response.data);
        });
      } catch (error) {
        console.log(error);
      }
    };

    fetch(articleId.id);
  }, []);
  useEffect(() => {
    console.log(findingSearch);
    if (findingSearch) {
      let url = "http://localhost:3001/api/routs/router/organizationFind";
      axios.post(url, { findingSearch }).then((res) => {
        setDataProject(res.data);
      });
    } else {
      const fetch = async (id: string) => {
        try {
          let url = "http://localhost:3001/api/routs/router/allProjects";
          await axios.post(url, { id }).then((response) => {
            console.log(response.data);
            setValidata(true);

            setDataProject(response.data);
          });
        } catch (error) {
          console.log(error);
        }
      };

      fetch(articleId.id);
    }
  }, [findingSearch]);

  // let quantityCheck =
  //   dataProject.length === 0 ? <h1>לא נוצרו פרוייקטים </h1> : "";
  const removeUser = (id: string) => {
    let url = "http://localhost:3001/api/routs/router/logOutUser";
    axios
      .post(url, { id })
      .then((response) => {
        setUserDelete("ההתנתקות בוצעה בהצלחה");
        histury.push("/login");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  // useEffect(() => {
  //   const userS = (_id: string) => {
  //     let url = "http://localhost:3001/api/routs/router/usersSpecific";
  //     axios
  //       .post(url, { _id })
  //       .then((res) => {
  //         if (res.data.permissions) {
  //           setValidPremissionUsers(true);
  //         }
  //       })
  //       .catch((err) => {
  //         console.log(err);
  //       });
  //   };
  //   userS(useId);
  // }, []);

  return (
    <StyleHome>
      <AppBar
        sx={{
          flexGrow: 1,
          minHeight: 100,
        }}
        position="static"
      >
        <WidthTable>
          <Menu />

          <LogOutUser
            removeUser={removeUser}
            openModal={openModal}
            setOpenModal={setOpenModal}
          ></LogOutUser>

          <UserWelcome> {`ברוך הבא ${userInfo.name}`}</UserWelcome>
          <ButtonUi
            onClick={() => {
              histury.push("/createProject");
            }}
          >
            צור פרויקט
          </ButtonUi>
        </WidthTable>
      </AppBar>
      <ProjectList dataProject={dataProject} valideRoleId={articleId} />;
    </StyleHome>
  );
};

export default AllProjects;

const WidthTable = styled.div`
  width: 100vw;
  margin-top: 1rem;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const StyleHome = styled.div`
  // background-color: blue;
`;

const UserWelcome = styled.div`
  font-size: 2rem;
`;

const MenuBar = styled.img``;
