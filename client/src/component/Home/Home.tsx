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
import { IProps, token, userId, userName } from "../atom/Atom";
import { useRecoilState } from "recoil";
import { Alert } from "@mui/material";
import hompage from "../image/homepage.png";
import { log } from "console";
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
  const [pass, setIsPass] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [validPass, setValidPass] = useState(false);
  const [validToken, setValidToken] = useState(false);
  const [useId, setUseId] = useRecoilState<string>(userId);
  const [NY, setNameUser] = useRecoilState<string>(userName);
  const [stateId, setStateId] = useState<string>("");
  const [isNotUserFlag, setIsNotUserFlag] = useState(false);
  const [data, setData] = useState<string>("");
  const [dataToken, setDataToken] = useRecoilState(token);
  let histury = useHistory();

  const sendEmail = (event: any) => {
    setIsEmail(event.target.value);
  };
  const sendPass = (event: any) => {
    setIsPass(event.target.value);
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
  const handleSubmit = async (event: any) => {
    event.preventDefault();

    if (pass.trim().length === 0) {
      setValidPass(true);
      return;
    }

    let url = "http://localhost:3001/api/routs/router/login";
    axios
      .post(url, { email, pass })
      .then(async (res) => {
        console.log(res.data);
        localStorage.setItem("tok", res.data.token);
        setDataToken(res.data);
        let url = "http://localhost:3001/api/routs/router/userInfo";
        await axios
          .get(url, { headers: { "x-api-key": localStorage["tok"] } })
          .then((res) => {
            console.log(res.data);
            // const storedData = localStorage.getItem("data");
            // console.log(storedData);
            // if (storedData) {
            //   setData(JSON.parse(storedData));
            // }
            setUseId(res.data[0]._id);
            setStateId(res.data[0]._id);
            setNameUser(res.data[0].name);
            setValidToken(true);
            histury.push("/projects");
          })
          .catch((err) => {
            console.log("err1");

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
  //   const storedData = localStorage.getItem("data");
  //   if (storedData) {
  //     setData(JSON.parse(storedData));
  //   }
  // }, []);

  // useEffect(() => {
  //   localStorage.setItem("data", JSON.stringify(data));
  // }, [data]);

  // useEffect(() => {
  //   if (validToken) {
  //     histury.push("/projects");
  //   }
  // }, [validToken]);

  return (
    <div
      style={{
        display: "flex",
        backgroundImage: `url(${hompage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
      }}
    >
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

              <Grid container>
                <Grid item xs>
                  <Link href="#" variant="body2">
                    שכחת סיסמא
                  </Link>
                </Grid>
                <Grid item>
                  <L to="/signUp">{"Don't have an account? Sign Up"}</L>
                </Grid>
              </Grid>
            </Box>
          </Box>
          <Copyright sx={{ mt: 8, mb: 4 }} />
        </Container>
      </ThemeProvider>
    </div>
  );
}
