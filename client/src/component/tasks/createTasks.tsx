import { TextareaAutosize } from "@mui/material";
import axios from "axios";
import { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import { idPrj } from "../atom/Atom";
import ButtonMisson from "../UI/Button";
import Card from "../UI/card";
import classes from "./CreateTasks.module.css";
interface IFormMission {
  _id: String;
  discrption: String;
  missionStatus: String;
  projectId: String;
  data_created: {
    type: Date;
  };
  endDate: { type: Date };
  remarks: String;
}
const CreateTasks = () => {
  const [ID, setId] = useRecoilState(idPrj);
  const {
    register,
    formState,
    formState: { errors, isDirty, isValid },
    handleSubmit,
  } = useForm<IFormMission>({
    mode: "onChange",
    defaultValues: {},
  });

  const registerPrj: SubmitHandler<IFormMission> = async (data) => {
    data.projectId = ID;
    let url = "http://localhost:3001/api/routs/router/creatMission";
    axios
      .post(url, data)
      .then((data) => {
        console.log(data);
        let url = "http://localhost:3001/api/routs/router/allMissionOfProject";
        axios.get(url).then((data) => {});
      })
      .catch((res) => {
        console.log("res", res);
      });
  };

  return (
    <Card className={classes.container}>
      <form onSubmit={handleSubmit(registerPrj)}>
        <label> תיאור המשימה </label>
        <TextareaAutosize
          {...register("discrption", { required: true })}
          placeholder="תיאור המשימה "
          style={{ width: 250, height: 100 }}
        />
        <br />
        {errors.discrption && " זהו שדה חובה  "}
        <br />
        <input
          {...(register("projectId"), { required: true })}
          type="hidden"
          value={ID}
        />
        <label> סטטוס משימה </label>
        <input
          {...register("missionStatus", { required: true })}
          type="text"
          placeholder="סטטוס משימה "
        />
        <br />
        {errors.missionStatus && "זהו שדה חובה "}
        <br />
        <label> תאריך התחלה </label>
        <input
          {...register("data_created", { required: true })}
          type="date"
          placeholder="תאריך התחלה "
        />
        <br />
        {errors.data_created && "זהו שדה חובה "}
        <br />
        <label>תאריך סיום </label>
        <input
          {...register("endDate", { required: true })}
          type="date"
          placeholder="תאריך סיום "
        />
        <br />
        {errors.endDate && "זהו שדה חובה "}
        <br />
        <label> הערות </label>
        <TextareaAutosize
          {...register("remarks")}
          placeholder="תיאור המשימה "
          style={{ width: 250, height: 100 }}
        />
        <ButtonMisson type="submit">סיום </ButtonMisson>
      </form>
    </Card>
  );
};
export default CreateTasks;
