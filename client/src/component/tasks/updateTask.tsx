import {
  AppBar,
  Box,
  Button,
  FormControl,
  FormHelperText,
  Input,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { idPrj } from "../atom/Atom";
import Card from "../UI/card";
interface IFormMission {
  _id: String;
  discrption: String;
  missionStatus: String;
  projectId: String;
  // dayjs: () => {};
  data_created: {
    type: Date;
  };
  endDate: { type: Date };
  remarks: String;
}
// interface IFormInputs {
//   _id: string;
//   nameProject: string;
//   client: string;
//   staff: string;
//   userId: string;
//   statusProject: string;
//   amountOfUsers: string;
// }
const UpdateTask: React.FC<{ onMission: IFormMission }> = (props) => {
  const [projId, setProjId] = useRecoilState(idPrj);
  const [updateProj, setUpdateProj] = useState({});
  const [isUpdate, setIsUpdate] = useState(false);

  const option = ["פעיל ", "לא פעיל", "תחזוקה"];
  const {
    register,
    formState,
    formState: { errors, isDirty, isValid },
    handleSubmit,
    reset,
  } = useForm<IFormMission>({
    mode: "onChange",
  });

  useEffect(() => {
    reset({
      _id: props.onMission._id,
      discrption: props.onMission.discrption,
      missionStatus: props.onMission.missionStatus,
      projectId: props.onMission.projectId,
      data_created: props.onMission.data_created,
      endDate: props.onMission.endDate,
      remarks: props.onMission.remarks,
    });
  }, []);
  const editRejister: SubmitHandler<IFormMission> = async (data) => {
    let url = `http://localhost:3001/api/routs/router/updateProject`;
    await axios
      .put(url, data)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Box
      sx={{
        position: "fixed",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        p: 1,
        m: 1,
        bgcolor: "background.paper",
        borderRadius: 1,
      }}
    >
      <Card>
        <form onSubmit={handleSubmit(editRejister)}>
          <InputLabel htmlFor="my-input"> תיאור המשימה </InputLabel>
          <Input
            id="my-input"
            aria-describedby="my-helper-text"
            type="text"
            // value={props.onUpdate.nameProject}
            {...register("discrption", { required: true })}
          />
          <FormHelperText id="my-helper-text">
            We'll never share your nameProject.
          </FormHelperText>
          <InputLabel htmlFor="my-input"> סטטוס משימה</InputLabel>
          <Input
            id="my-input"
            aria-describedby="my-helper-text"
            type="text"
            // value={props.onUpdate.staff}
            {...register("missionStatus", { required: true })}
          />
          <FormHelperText id="my-helper-text">
            We'll never share your developer.
          </FormHelperText>
          <InputLabel htmlFor="my-input">תאריך התחלה </InputLabel>
          <Input
            id="my-input"
            aria-describedby="my-helper-text"
            type="date"
            // value={props.onUpdate.client}
            {...register("data_created", { required: true })}
          />
          <FormHelperText id="my-helper-text">
            We'll never share your client.
          </FormHelperText>
          <InputLabel htmlFor="my-input"> תאריך סיום </InputLabel>
          <Input
            id="my-input"
            aria-describedby="my-helper-text"
            type="date"
            {...register("endDate", { required: true })}
          />
          <FormHelperText id="my-helper-text">
            We'll never share your amountOfUsers.
          </FormHelperText>
          {/* <FormHelperText id="my-helper-text">
            We'll never share your client.
          </FormHelperText> */}
          <InputLabel htmlFor="my-input"> הערות </InputLabel>
          <Input
            id="my-input"
            aria-describedby="my-helper-text"
            type="text"
            {...register("remarks", { required: true })}
          />
          <FormHelperText id="my-helper-text">
            We'll never share your amountOfUsers.
          </FormHelperText>
          {/* <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              type="text"
              {...register("statusProject", { required: true })}
            >
              {errors.statusProject && "חובה  לבחור "}
              <MenuItem>פעיל</MenuItem>
              <MenuItem>לא פעיל</MenuItem>
              <MenuItem>תחזוקה</MenuItem>
            </Select>
            <FormHelperText id="my-helper-text">
              We'll never share your statusProject.
            </FormHelperText> */}

          <Button variant="contained" type="submit" color="success">
            {" "}
            עדכן
          </Button>
        </form>
      </Card>
    </Box>
  );
};
export default UpdateTask;
