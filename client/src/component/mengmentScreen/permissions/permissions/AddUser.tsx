import React, { Dispatch, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { AllUsersPROPS, OptionStyled, SelectStyled } from "./AllUsers";
import styled from "styled-components";
import { ReactComponent as NewUser } from "../../folder svg/addUser.svg";
import GroupAddIcon from "@mui/icons-material/GroupAdd";
import { Button } from "@mui/material";
interface IProps {
  setListUsers: Dispatch<React.SetStateAction<AllUsersPROPS[]>>;
  listUsers: AllUsersPROPS[];
}
export const AddUser = (props: IProps) => {
  const [closeModale, setCloseModal] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const {
    register,
    formState: { errors, isDirty, isValid },
    handleSubmit,
  } = useForm<AllUsersPROPS>({
    mode: "onChange",
  });
  const registerPrj: SubmitHandler<AllUsersPROPS> = (data) => {
    data.permission = false;
    data.id = "4";
    props.setListUsers([...props.listUsers, data]);
    setOpenModal(false);
  };

  return (
    <>
      {openModal && (
        <ModalOverlay>
          {
            <ModalContent>
              <FormContainer onSubmit={handleSubmit(registerPrj)}>
                <FormField>
                  <Label htmlFor='nameUser'>שם משתמש</Label>

                  <Input type='text' {...register("name", { required: true })} />
                </FormField>
                <FormField>
                  <Label htmlFor='persunalNum'>מספר אישי </Label>
                  <Input type='number' {...register("persunalNum", { required: true })} />
                </FormField>
                <div>
                  <AddNewUser type='submit'>הוסף</AddNewUser>

                  <CunselButton
                    onClick={() => {
                      setOpenModal(false);
                    }}
                  >
                    ביטול
                  </CunselButton>
                </div>
              </FormContainer>
            </ModalContent>
          }
        </ModalOverlay>
      )}
       <Button
            variant="contained"
            onClick={()=> setOpenModal(true)}
            sx={{
              borderRadius: "50%",
              padding: "10px",
              minWidth: 0,
              color: "white",
              backgroundColor: "#0661A2",
              "&:hover": {
                backgroundColor: "lightblue",
              },
            }}
          >
            <GroupAddIcon />
          </Button>
    </>
  );
};
const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
  width: 30vw;
  height: 40vh;
`;

const FormContainer = styled.form`
  display: flex;
  flex-direction: column;
  max-width: 300px;
  margin: 0 auto;
`;

const FormField = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

const Label = styled.label`
  font-weight: bold;
  margin-bottom: 4px;
`;

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const Buttons = styled.button`
  padding: 8px 16px;

  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const CunselButton = styled(Buttons)`
  background-color: #007bff;
`;
const AddNewUser = styled(Buttons)`
  background-color: #102296;
`;
