import * as React from "react";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import { Link as L } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { useState } from "react";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import axios from "axios";
import { token, userId, UserInfo, userName } from "../atom/Atom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { Alert } from "@mui/material";
import hompage from "../image/homepage.png";
import { ShellForForms } from "../shellForForms";

interface IUsers {
  _id: string;
  permissions: String;
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

export default function Home() {
  const [email, setIsEmail] = useState("");
  const [password, setIsPass] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [validPass, setValidPass] = useState(false);
  const [validToken, setValidToken] = useState(false);
  const [useId, setUseId] = useRecoilState<string>(userId);
  const [userInfo, setUserInfo] = useRecoilState(UserInfo);
  // const [NY, setNameUser] = useRecoilState<string>(userName);

  const [isNotUserFlag, setIsNotUserFlag] = useState(false);

  const [dataToken, setDataToken] = useRecoilState(token);
  let histury = useHistory();

  const sendEmail = (event: any) => {
    setIsEmail(event.target.value);
  };
  const sendPass = (event: any) => {
    setIsPass(event.target.value);
  };
  // React.useEffect(() => {
  //   if (userInfo._id) histury.push("/projects/" + userInfo._id);
  // }, [userInfo]);

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    // if (password.trim().length === 0) {
    //   setValidPass(true);
    //   return;
    // }

    let url = "http://localhost:3001/api/routs/router/login";
    axios
      .post(url, { email, password })
      .then(async (res) => {
        console.log(res.data);
        localStorage.setItem("tok", res.data.token);
        setDataToken(res.data);
        let url = "http://localhost:3001/api/routs/router/userInfo";
        await axios
          .get(url, { headers: { "x-api-key": localStorage["tok"] } })
          .then((res) => {
            setUseId(res.data[0]._id);
            setUserInfo(res.data[0]);

            setValidToken(true);
            histury.push("/projects/" + res.data[0]._id);
          })
          .catch((err) => {
            return console.log({ msg: err });
          });
      })
      .catch((err) => {
        setIsNotUserFlag(true);
        return console.log(err);
      });
    setIsEmail("");
    setIsPass("");
  };
  // useEffect(() => {
  //   console.log(useId);
  // }, [useId]);

  return (
    <ShellForForms>
      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          {/* <div>
          {data && <p>Data from local storage: {data}</p>}
          <button onClick={() => setData("example data")}>Save data</button>
        </div> */}
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
            }}
          >
            {isNotUserFlag && (
              <Alert severity="error">
                אינך מחובר <L to="/signUp">התחברות</L>
              </Alert>
            )}

            <Typography component="h1" variant="h5">
              ברוכים הבאים לפרוייקטים של המערכת
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                onChange={sendEmail}
                value={email}
                margin="normal"
                required
                fullWidth
                id="email"
                label="אימייל"
                name="email"
                autoComplete="email"
                autoFocus
                // onBlur={onBlorPass}
              />
              {validEmail && <p>nkndsknkn</p>}
              <TextField
                onChange={sendPass}
                value={password}
                margin="normal"
                required
                fullWidth
                name="password"
                label="סיסמא"
                type="password"
                id="password"
                autoComplete="current-password"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                // onClick={userInfo}
              >
                כניסה
              </Button>

              <Grid container>
                {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    שכחת סיסמא
                  </Link>
                </Grid> */}
                <Grid item>
                  <L to="/signUp">{"עוד לא התחברת? התחברות"}</L>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </ShellForForms>
  );
}
