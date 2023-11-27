import {
  Button,
  Divider,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import React from "react";
import { AllUsersPROPS } from "./AllUsers";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import createCache from "@emotion/cache";
// import { prefixer } from "stylis";
// import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { AddUser } from "./AddUser";
import styled from "styled-components";

export const users: AllUsersPROPS[] = [
  { id: "1", name: "תומר", permission: true, persunalNum: 11111 },
  { id: "2", name: "אלמוג", permission: true, persunalNum: 22222 },
  { id: "3", name: "מתנאל", permission: false, persunalNum: 33333 },
];

const styely = {
  direction: "row",
  justifyContent: "center",
  alignItems: "center",
  p: 1,
};

const cacheRtl = createCache({
  key: "muirtl",
  // stylisPlugins: [prefixer, rtlPlugin],
});
interface IProps {
  openListUsers: boolean;
}

const All = (props: IProps) => {
  const [listUsers, setListUsers] = React.useState(users);
  const [selected, setSelected] = React.useState<string>("בחר סוג הרשאה");
  const [editOption, setEditOption] = React.useState({ open: false, ind: 0 });

  const handelDelte = (id: string) => {
    const deleteUser = listUsers.filter((user) => {
      return user.id !== id;
    });
    setListUsers(deleteUser);
  };

  const updateListUsers = (index: number, value: string) => {
    let falg: boolean;
    value === "admin" ? (falg = true) : (falg = false);

    const updatedUsers = listUsers.map((user, i) => {
      if (i === index) {
        return {
          ...user,
          permission: falg,
        };
      } else {
        return user;
      }
    });

    setListUsers(updatedUsers);
    setEditOption({ open: false, ind: 0 });
  };

  return (
    <>
      {props.openListUsers && (
        <Pardms>
          <Grid
            container
            width={"90%"}
            sx={{
              boxShadow: 10,
              borderBottom: "3px solid #1C6EA4",
              borderRadius: "20px 20px 20px 20px",
              p: 2,
              direction: "rtl",
            }}
          >
            <Typography
              variant="h6"
              sx={{
                background: "#83C1ED",
                borderRadius: "20px 20px 20px 20px",
                color: "#ffff",
              }}
              align="center"
              width={"100%"}
              height={"5%"}
            >
              ניהול משתמשים
            </Typography>

            {listUsers.map((itemp: AllUsersPROPS, index) => {
              return (
                <>
                  <Grid
                    container
                    direction="row"
                    justifyContent="space-between"
                    alignItems="flex-start"
                    // width={"100%"}
                    key={index}
                  >
                    <Grid
                      container
                      direction="row"
                      justifyContent="flex-start"
                      alignItems="flex-start"
                      // width={"80%"}
                      sx={{ pt: 2 }}
                    >
                      <Grid container xs={3} sx={styely}>
                        <Typography variant="h6">{`שם מלא - ${itemp.name}`}</Typography>
                      </Grid>

                      <Divider
                        orientation="vertical"
                        flexItem
                        sx={{ bgcolor: "#83C1ED" }}
                      />

                      <Grid container xs={4} sx={styely}>
                        <Typography
                          sx={{
                            wordWrap: "break-word",
                            whiteSpace: "pre-line",
                          }}
                        >
                          {`מספר אישי - ${itemp.persunalNum}`}
                        </Typography>
                      </Grid>

                      <Divider
                        orientation="vertical"
                        flexItem
                        sx={{ bgcolor: "#83C1ED" }}
                      />

                      <Grid container xs={4} sx={styely}>
                        {editOption.open && editOption.ind === index ? (
                          <CacheProvider value={cacheRtl}>
                            <InputLabel>בחר סוג הרשאה</InputLabel>
                            <Select
                              fullWidth
                              label
                              variant="standard"
                              value={selected}
                              onChange={(event) =>
                                setSelected(event.target.value)
                              }
                            >
                              <MenuItem value={"admin"}>מנהל</MenuItem>
                              <MenuItem value={"user"}>משתמש</MenuItem>
                            </Select>
                          </CacheProvider>
                        ) : (
                          <Typography variant="h6">
                            {itemp.permission ? "מנהל" : "משתמש"}
                          </Typography>
                        )}
                      </Grid>
                    </Grid>

                    <Grid
                      container
                      direction="row"
                      justifyContent="center"
                      alignItems="center"
                      sx={{ width: "20%", height: "100%" }}
                    >
                      {editOption.open && editOption.ind === index ? (
                        <Button
                          onClick={() => updateListUsers(index, selected)}
                        >
                          <CloudUploadIcon
                            htmlColor="#1976d2"
                            fontSize="large"
                          />
                        </Button>
                      ) : (
                        <Button
                          onClick={() => {
                            setEditOption({ open: true, ind: index });
                          }}
                        >
                          <EditIcon htmlColor="#0661A2" />
                        </Button>
                      )}
                      <Button
                        onClick={() => {
                          handelDelte(itemp.id);
                        }}
                      >
                        <DeleteIcon htmlColor="#0661A2" />
                      </Button>
                    </Grid>
                  </Grid>
                </>
              );
            })}

            {/* <Grid container justifyContent="flex-end">
              <AddUser listUsers={listUsers} setListUsers={setListUsers} />
            </Grid> */}
          </Grid>
        </Pardms>
      )}
    </>
  );
};

export default All;

const Pardms = styled.div`
  position: fixed;

  margin-top: 5rem;

  background-color: #d5e2e4;

  overflow-y: auto;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;
