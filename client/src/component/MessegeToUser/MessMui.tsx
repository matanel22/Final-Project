import * as React from "react";
import Alert from "@mui/material/Alert";
import CheckIcon from "@mui/icons-material/Check";

interface IP {
  message: string;
  typeAlert: any;
}

export default function SimpleAlert({ message, typeAlert }: IP) {
  return (
    <Alert icon={<CheckIcon fontSize="inherit" />} severity={typeAlert}>
      {message}
    </Alert>
  );
}
