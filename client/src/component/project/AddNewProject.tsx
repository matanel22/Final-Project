import React, { useState, useRef, useEffect, FormEvent } from "react";
// import Button from "../UI/Button";
import classes from "./AddNewProject.module.css";
import Card from "../UI/card";
import { SubmitHandler, useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import { useRecoilState } from "recoil";
import { userId } from "../atom/Atom";
// "name": "בטיחות",
// "developer": "ליאל",
// "client": "מלמ",
// "maintenaceMode
export interface IUsers {
  _id: string;
  name: string;
  email: string;
  pass: string;
}
interface IFormInputs {
  nameProject: string;
  client: string;
  staff: string;
  userId: string;
  statusProject: string;
  amountOfUsers: string;
}
const option = ["פעיל ", "לא פעיל", "תחזוקה"];

const AddNewProject: React.FC = (props) => {
  // const [useId, setUseId] = useRecoilState<string>(userId);
  const [usersData, setUsersData] = useState<IUsers[]>([]);
  const [validata, setValidata] = useState("");
  const {
    register,
    formState,
    formState: { errors, isDirty, isValid },
    handleSubmit,
  } = useForm<IFormInputs>({
    mode: "onChange",
    defaultValues: {
      nameProject: "",
      client: "",
      staff: "",
      userId: "",
      statusProject: "",
      amountOfUsers: "",
    },
  });
  console.log("isValid", isValid);

  const registerPrj: SubmitHandler<IFormInputs> = async (data) => {
    let flag = false;
    let url = "http://localhost:3001/api/routs/router/allUsers";
    await axios
      .get(url)
      .then((res) => {
        console.log(res.data);
        res.data.map((item: any, index: any) => {
          if (item.name.trim() === data.staff.trim()) {
            data.userId = item._id;
            flag = true;
          }
        });

        setUsersData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
    if (flag) {
      try {
        let url = "http://localhost:3001/api/routs/router/addCreatProject";
        axios.post(url, data).then(({ data }) => {
          console.log(data);
        });
      } catch (error) {
        console.log(error);
      }
    } else {
      setValidata("developer not found ");
    }
  };

  useEffect(() => {
    console.log(usersData);
  }, [usersData]);

  return (
    <div>
      <Box sx={{ flexGrow: 1, minHeight: 150 }}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              sx={{ mr: 2 }}
            ></IconButton>
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              News
            </Typography>
            <Link to="/projects">
              <Button
                color="secondary"
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                {/* <Icon color="primary">add_circle</Icon> */}
                לפרוייקטים
              </Button>
            </Link>
            ;{/* <Button color="inherit">Login</Button> */}
          </Toolbar>
        </AppBar>
      </Box>
      <Card className={classes.AddNewProject}>
        <form onSubmit={handleSubmit(registerPrj)}>
          <TextField
            id="outlined-basic"
            {...register("nameProject", { required: true })}
            label="שם פרוייקט"
            variant="outlined"
            type="text"
          />
          {errors.nameProject && "חובה למלא שם פרוייקט"}
          <TextField
            id="outlined-basic"
            {...register("staff", { required: true })}
            label=">שם הצוות "
            variant="outlined"
            type="text"
          />
          {errors.staff && "חובה למלא שם צוות"}
          <TextField
            id="outlined-basic"
            value={userId}
            {...register("userId")}
            variant="outlined"
            type="hidden"
          />

          <TextField
            id="outlined-basic"
            {...register("client", { required: true })}
            label="שם לקוח"
            variant="outlined"
            type="text"
          />
          {errors.client && "חובה למלא שם לקוח"}
          <TextField
            id="outlined-basic"
            {...register("amountOfUsers", { required: true })}
            label="כמות משתמשים "
            variant="outlined"
            type="text"
          />
          {errors.amountOfUsers && "חובה למלא האם יש משתמשים"}

          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            type="text"
            {...register("statusProject", { required: true })}
          >
            {errors.statusProject && "חובה  לבחור "}
            {option.map((item, index) => {
              return <MenuItem value={item[0]}>{item[0]}</MenuItem>;
            })}
          </Select>
          {errors.client && "חובה לבחור סטטוס"}

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disableElevation
          >
            יצירת פרוייקט
          </Button>
          {/* <Link to="/projects">
            <Button >כל פרוייקטים</Button>
          </Link> */}
        </form>
        {validata}
      </Card>
    </div>
  );
};

export default AddNewProject;

// /// {currencies.map((option) => (
//   <MenuItem key={option.value} value={option.value}>
//   {option.label}
// </MenuItem>
// if (usersData) {
//   for (let i = 0; i < usersData.length; i++) {
//     if (usersData[i].name.trim() === data.staff.trim()) {
//       data.userId = usersData[i]._id;
//       flag = true;
//     }
//   }
// }
