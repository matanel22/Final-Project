import { Button, TableCell } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";
import { useRecoilState } from "recoil";
import { idPrj } from "../atom/Atom";
interface IProps {
  projectId: string;

  validPremissionUsers?: boolean;
  onClickShowModal(id: string, index: number): void;
  index: number;
  buttonDel: string;
  buttonUpdate: string;
}

export const Buttons = (props: IProps) => {
  const [projId, setProjId] = useRecoilState(idPrj);
  return (
    <>
      <TableCell align="right">
        <Link to={`/tasks/${props.projectId}`}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              setProjId(props.projectId);
            }}
          >
            {props.buttonDel}
          </Button>
        </Link>
      </TableCell>
      <TableCell align="right">
        {" "}
        {
          <Button
            variant="contained"
            color="primary"
            onClick={() => {
              props.onClickShowModal(props.projectId, props.index);
            }}
          >
            {props.buttonUpdate}
          </Button>
        }
      </TableCell>
    </>
  );
};
