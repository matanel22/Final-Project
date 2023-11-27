import { Box, Button, Grid } from "@mui/material";
// import img from "../../folder svg/AtalLogo.png";
// import { useNavigate } from "react-router-dom";
import React from "react";
import { useHistory } from "react-router-dom";
export const PermissionScreen = () => {
  const history = useHistory();

  return (
    <Grid
      container
      direction="row"
      justifyContent="center"
      alignItems="center"
      sx={{ height: "100vh", width: "100%" }}
    >
      {/* <Box
        sx={{
          background: `url(${img})`,
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          opacity: 0.4,
          height: "70%",
          width: "100%",
          zIndex: -1,
        }}
      ></Box> */}
      <Button
        sx={{
          background: "#28aa04e8",
          position: "absolute",
        }}
        variant="contained"
        onClick={() => history.push("/home")}
      >
        ניהול משתמשים
      </Button>
    </Grid>
  );
};
