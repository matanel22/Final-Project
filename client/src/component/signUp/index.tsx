import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link as L } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Link from "@mui/material/Link";

import Box from "@mui/material/Box";
import React, { useState, useEffect, useReducer } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
// import { foolNameReducer, emailReducer, passReducer } from "./PostReducer";
import hompage from "../image/homepage.png";
import { INITIAL_STATE, postReduser } from "./PostReducer";
import { error } from "console";

// export interface IUsers {
//   name: string;
//   email: string;
//   pass: string;
// }
// const signUpReduser = (state: any, action: any) => {
//   switch (action.type) {
//     case "FIELD": {
//       // console.log({ ...state });
//       return {
//         ...state,
//         [action.field]: action.value,
//         error: "",
//       };
//     }
//     case "SIGNUP": {
//       return {
//         ...state,
//         isLoading: true,
//         error: "",
//       };
//     }
//     case "SUCCESS": {
//       return {
//         ...state,
//         isLoading: true,
//         error: "",
//       };
//     }
//     case "ERROR": {
//       return {
//         ...state,
//         isLoading: true,
//         error: "incorrect user name or password",
//       };
//     }
//     default:
//       break;
//   }

//   return state;
// };

function Copyright(props: any) {
  return (
    <Typography
      variant="body2"
      color="text.secondary"
      align="center"
      {...props}
    >
      {"Copyright © "}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();

export default function SignUp() {
  // const [formIsValid, setFormIsValid] = useState(false);
  const [state, dispatch] = useReducer(postReduser, INITIAL_STATE);
  const [isFormValid, setIsFormValid] = useState(false);

  // Validation logic function
  const validateForm = () => {
    setIsFormValid(
      state.userName.trim() !== "" &&
        state.password.trim() !== "" &&
        state.email.trim() !== "" &&
        state.email.includes("@")
    );
  };

  let histury = useHistory();
  // const { userName, email, passWord, isLoading, error } = state;

  const handelChangeUserName = (e: any) => {
    dispatch({
      type: "CHENGE_INPUT",
      // field: userName,
      payload: { name: e.target.name, value: e.target.value },
    });
    console.log(state);

    validateForm();
  };
  const FORMS_SIGN_UP = [
    {
      lable: "שם משתמש",
      name: "userName",
      type: "userName",
      value: state.userName,
    },
    {
      lable: "אימייל",
      name: "email",
      type: "email",
      value: state.email,
    },
    {
      lable: "סיסמא",
      name: "password",
      type: "password",
      value: state.password,
    },
  ];
  // const disbaleValide = ;

  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(state);

    if (!isFormValid) {
      dispatch({ type: "FATCH_ERROR" });
      console.log(state.error);
    } else {
      let url = "http://localhost:3001/api/routs/router/signUp";
      axios
        .post(url, {
          name: state.userName,
          email: state.email,

          password: state.password,
        })
        .then((res) => {
          dispatch({ type: "FATCH_SUCCESS" });
          histury.push("/login");
        })
        .catch((err) => {
          dispatch({ type: "FATCH_ERROR" });
          console.log(err);
        });
    }
  };

  return (
    <div
      style={{
        display: "flex",
        background: `url(${hompage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography component="h1" variant="h5"></Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              {FORMS_SIGN_UP.map((item) => {
                return (
                  <TextField
                    type={item.type}
                    onChange={handelChangeUserName}
                    value={item.value}
                    margin="normal"
                    required
                    fullWidth
                    label={item.lable}
                    name={item.name}
                    autoComplete="name"
                    autoFocus
                  />
                );
              })}

              <Button
                type="submit"
                fullWidth
                disabled={!isFormValid}
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                // onClick={userInfo}
              >
                כניסה
              </Button>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
}
