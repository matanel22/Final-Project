import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link as L } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useState, useEffect } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";

export interface IUsers {
  name: string;
  email: string;
  pass: string;
}

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
  const [email, setIsEmail] = useState("");
  const [pass, setIsPass] = useState("");
  const [name, setIsName] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [validPass, setValidPass] = useState(false);
  const [validName, setValideName] = useState(false);
  const [valideSaveUser, setValideSaveUser] = useState(false);

  let histury = useHistory();
  const sendEmail = (event: any) => {
    setIsEmail(event.target.value);
  };
  const sendPass = (event: any) => {
    setIsPass(event.target.value);
  };
  const sendName = (event: any) => {
    setIsName(event.target.value);
  };
  // const onBlorPass = () => {
  //   if (isPass.trim().length === 0) {
  //     setValidPass(true);
  //     return;
  //   }
  //   // if (isPass.includes("@")) {
  //   //   setValidEmail(true);

  //   //   return;
  //   // }
  // };
  const handleSubmit = (event: any) => {
    event.preventDefault();

    if (pass.trim().length === 0) {
      setValidPass(true);
      return;
    }
    let url = "http://localhost:3001/api/routs/router/validatIsUsers";
    axios
      .post(url, { name, email, pass })
      .then((res) => {
        console.log(res.data);
        setValideSaveUser(true);
        // console.log(validToken);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (valideSaveUser) {
      histury.push("/login");
    }
  }, [valideSaveUser]);

  return (
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
          <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}></Avatar>
          <Typography component="h1" variant="h5"></Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              onChange={sendName}
              value={name}
              margin="normal"
              required
              fullWidth
              id="name"
              label="שם מלא"
              name="name"
              autoComplete="name"
              autoFocus
              // onBlur={onBlorPass}
            />
            <TextField
              onChange={sendEmail}
              value={email}
              margin="normal"
              required
              fullWidth
              id="email"
              label="אימייל "
              name="email"
              autoComplete="email"
              autoFocus
              // onBlur={onBlorPass}
            />
            {validEmail && <p>nkndsknkn</p>}
            <TextField
              onChange={sendPass}
              value={pass}
              margin="normal"
              required
              fullWidth
              name="password"
              label="סיסמא"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            {validPass && <p>nkndsknkn</p>}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              // onClick={userInfo}
            >
              כניסה
            </Button>

            {/* <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  שכחת סיסמא
                </Link>
              </Grid>
            </Grid> */}
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
