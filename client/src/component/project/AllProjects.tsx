import { AppBar, Avatar, Box, Button, Modal, Toolbar } from "@mui/material";
import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import ProjectList from "./ProjectList";
import { useRecoilState } from "recoil";
import { AllProjectData, userId, userName } from "../atom/Atom";
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import OvalButton from "../UI/ButtonStyle";
import { blueGrey, red } from "@mui/material/colors";
import { display } from "@mui/system";
import { NavButton } from "../UI/NavButton";
export interface IProps {
  _id: string;
  readonly nameProject: string;
  staff: string;
  userId: string;
  readonly client: string;
  statusProject: string;
  amountOfUsers: string;
}

const AllProjects = () => {
  const [dataProject, setDataProject] = useRecoilState(AllProjectData);
  const [validata, setValidata] = useState(false);
  const [useId, setUseId] = useRecoilState<string>(userId);
  const [NY, setNameUser] = useRecoilState<string>(userName);
  const [validPremissionUsers, setValidPremissionUsers] = useState(false);
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [openModal, setOpenModal] = useState(false);
  const histury = useHistory();
  useEffect(() => {
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

    fetch(useId);
  }, []);

  // let quantityCheck =
  //   dataProject.length === 0 ? <h1>לא נוצרו פרוייקטים </h1> : "";
  const removeItems = () => {
    localStorage.removeItem("tok");
    histury.push("/login");
  };
  useEffect(() => {
    const userS = (_id: string) => {
      let url = "http://localhost:3001/api/routs/router/usersSpecific";
      axios
        .post(url, { _id })
        .then((res) => {
          if (res.data.permissions) {
            setValidPremissionUsers(true);
          }
          // console.log("useId", useId);
          // console.log("resData", res.data);
        })
        .catch((err) => {
          console.log(err);
        });
      console.log(validPremissionUsers);
    };
    userS(useId);
  }, []);
  const color = red[500];
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
          <Avatar
            sx={{
              m: 1,
              bgcolor: "#bd2828",
              height: "70px",
              width: "70px",
              cursor: "pointer",
            }}
            onClick={() => {
              setOpenModal(true);
            }}
          ></Avatar>
          {openModal && (
            <Modal
              open={openModal}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
              onClose={handleClose}
            >
              <WrapperModal>
                <p> ברצונך להתנתק</p>
                <NavButton
                  onClick={() => {
                    removeItems();
                  }}
                >
                  כן
                </NavButton>
                <NavButton
                  onClick={() => {
                    setOpenModal(false);
                  }}
                >
                  לא
                </NavButton>
              </WrapperModal>
            </Modal>
          )}
          <UserWelcome> {`ברוך הבא ${NY}`}</UserWelcome>
          <OvalButton
            onClick={() => {
              histury.push("/createProject");
            }}
          >
            צור פרויקט
          </OvalButton>
        </WidthTable>
      </AppBar>
      <ProjectList onProps={dataProject} />;
    </StyleHome>
  );
};

export default AllProjects;
const WrapperModal = styled.div`
  font-size: 1.5rem;
  width: 20vw;
  // display: flex;
  // justify-content: center;
  // align-items: center;
  margin: 50px;
  background-color: white;
`;
const WidthTable = styled.div`
  width: 100vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

const StyleHome = styled.div`
  background-color: blue;
`;

const UserWelcome = styled.div`
  font-size: 2rem;
`;
