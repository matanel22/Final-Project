import { Button, TableCell } from "@mui/material";
import { Dispatch } from "react";
import React from "react";
import { DeleteTask } from "../tasks/DeleteTask";
interface ISbuttonsTable {
  setOpenModal: Dispatch<React.SetStateAction<boolean>>;
  openModal: boolean;
  showEditTask(id: string, index: number): void;
  itemId: string;
  index: number;

  buttonDel: string;
  buttonUpdate: string;
}
export const ButtonsTable = (props: ISbuttonsTable) => {
  return (
    <>
      <TableCell align="right">
        <Button
          variant="outlined"
          color="error"
          onClick={() => {
            props.setOpenModal(true);
          }}
        >
          {props.buttonDel}
        </Button>{" "}
        <Button
          variant="outlined"
          color="success"
          onClick={() => {
            props.showEditTask(props.itemId, props.index);
          }}
        >
          {props.buttonUpdate}
        </Button>
      </TableCell>
    </>
  );
};
