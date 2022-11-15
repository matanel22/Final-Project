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
  const [isEmail, setIsEmail] = useState("");
  const [isPass, setIsPass] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [validPass, setValidPass] = useState(false);
  let histury = useHistory();
  const sendEmail = (event: any) => {
    setIsEmail(event.target.value);
  };
  const sendPass = (event: any) => {
    setIsPass(event.target.value);
  };
  const handleSubmit = (event: any) => {
    event.preventDefault();
    console.log(isEmail);
    if (isPass.trim().length === 0) {
      setValidPass(true);
      // setValidPass(false)
      return;
    }
    if (isPass.includes("@")) {
      setValidEmail(true);
      // setValidPass(false)

      return;
    }
    histury.push("/projects");
  };

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
          <Typography component="h1" variant="h5">
            הפרוייקטים של המדור
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
            <TextField
              onChange={sendEmail}
              value={isEmail}
              margin="normal"
              required
              fullWidth
              id="email"
              label="אימייל "
              name="email"
              autoComplete="email"
              autoFocus
            />
            {validEmail && <p>nkndsknkn</p>}
            <TextField
              onChange={sendPass}
              value={isPass}
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
            {/* <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            /> */}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
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
                <Link href="#" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}
