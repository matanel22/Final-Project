import { Box, Button, Input, InputLabel } from "@mui/material";

import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { AllProjectData, allUsers, idPrj } from "../atom/Atom";

import { useHistory } from "react-router-dom";
import styled from "styled-components";
import AnimatedMulti from "./MultySelect";
import { dropdown } from "./LogOutUser";
import ButtonLoading from "../UI/ButtonLoadung";

export interface IProps {
  _id: string;
  nameProject: string;
  staff: string[];
  client: string;
  // matchingUsers: string[];
  statusProject: string;
  amountOfUsers: string;
}

const UPDATE_PROJECT = [
  { name: "שם פרוייקט ", type: "text", register: "nameProject" },

  { name: "שם הלקוח", type: "text", register: "client" },

  { name: "האם יש משתמשים", type: "text", register: "amountOfUsers" },
];
const UpdateProject: React.FC<{
  onUpdate: IProps;
  openUpdate: boolean;
  projIndex: number;
}> = (props) => {
  const [isUpdate, setIsUpdate] = useState(false);
  const [isUser, setIsUser] = useState(false);
  const [isClick, setIsClick] = useState(false);
  const [validUser, setValidUser] = useState("");
  const [open, setOpen] = React.useState(true);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [isSucceed, setIsSucced] = useState(false);
  const [listUsers, setListUsers] = useRecoilState(allUsers);
  const [dataProject, setDataProject] = useRecoilState(AllProjectData);
  const [selectedItems, setSelectedItems] = useState<string[]>([]);

  // const [isClose, setIsOpen] = useState<boolean>(props.openUpdate);

  const {
    register,

    formState: { errors },
    handleSubmit,
    reset,
  } = useForm<IProps>({
    mode: "onChange",
  });
  const style = {
    position: "absolute" as "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: "60%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  useEffect(() => {
    reset({
      _id: props.onUpdate._id,
      staff: props.onUpdate.staff,
      statusProject: props.onUpdate.statusProject,
      amountOfUsers: props.onUpdate.amountOfUsers,
      nameProject: props.onUpdate.nameProject,
      client: props.onUpdate.client,
    });
  }, []);
  const editRejister: SubmitHandler<IProps> = async (data) => {
    setIsClick(true);
    setIsUpdate(!isUpdate);

    // listUsers.map(async (item: any) => {
    let url = `http://localhost:3001/api/routs/router/updateProject`;
    await axios
      .put(url, data)
      .then((res) => {
        let k = 0;
        for (let userMeng of listUsers) {
          if (data.staff[k] === userMeng._id) {
            data.staff[k++] = userMeng.name;
          }
          console.log(data.staff);
        }
        const index = dataProject.findIndex((obj) => obj._id === data._id);
        const updatedObject = {
          ...dataProject[index],
          amountOfUsers: data.amountOfUsers,
          client: data.client,
          _id: data._id,
          nameProject: data.nameProject,
          staff: data.staff,
          statusProject: data.statusProject,
        };

        const newArray: any = [
          ...dataProject.slice(0, index),
          updatedObject,
          ...dataProject.slice(index + 1),
        ];

        setDataProject(newArray);
        setIsSucced(true);
      })
      .catch((err) => {
        console.log(err);
      });
    setIsUser(true);
    setOpen(false);
    // });
  };

  return (
    <Modal
      open={open}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      onClose={handleClose}
    >
      <Box sx={style}>
        <Wrapper>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            <form onSubmit={handleSubmit(editRejister)}>
              {UPDATE_PROJECT.map((item: any, index) => {
                return (
                  <div key={index}>
                    <InputLabel htmlFor="my-input">{item.name} </InputLabel>
                    <Input
                      id="my-input"
                      aria-describedby="my-helper-text"
                      type={item.type}
                      // value={props.onUpdate.nameProject}
                      {...register(item.register, { required: true })}
                    />
                  </div>
                );
              })}

              {errors.nameProject && "שדה חובה"}
              <InputLabel htmlFor="my-input">{"סטטוס פרוייקט"} </InputLabel>

              <SelectProject
                id="demo-simple-select"
                {...register("statusProject", { required: true })}
              >
                <option>{"פעיל"}</option>

                <option>{"לא פעיל"}</option>
              </SelectProject>
              {errors.statusProject && "שדה חובה"}
              <AnimatedMulti
                staff={props.onUpdate.staff}
                setSelectedItems={setSelectedItems}
                selectedItems={selectedItems}
              />
              <br />
              <ButtonDiv>
                <ButtonLoading textButton="שמירה" />

                <Button
                  variant="outlined"
                  color="error"
                  onClick={() => {
                    setOpen(false);
                  }}
                >
                  ביטול
                </Button>
              </ButtonDiv>
            </form>
          </Typography>
        </Wrapper>
      </Box>
    </Modal>
  );
};
export default UpdateProject;

const ButtonDiv = styled.div`
  display: flex;
  justify-content: space-evenly;
`;
export const SelectProject = styled.select`
  width: 75%;
  padding: 10px;
  margin-bottom: 20px;
  border: none;
  border-radius: 5px;
  background-color: #e0e0e0;
`;
const Wrapper = styled.div`
  animation: ${dropdown} 2s ease 0s 1 normal forwards;
`;
