import { Button, TableCell } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";
import { useRecoilState } from "recoil";
import { UserInfo, idPrj } from "../atom/Atom";
import { useHistory } from "react-router-dom";
import { ButtonUi } from "../Menu";
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
  const [userInfo, setUserInfo] = useRecoilState(UserInfo);

  const history = useHistory();
  return (
    <>
      <TableCell align="right">
        {/* <Link to={`/tasks/${props.projectId}`}> */}

        <Button
          variant="outlined"
          size="medium"
          onClick={() => {
            setProjId(props.projectId);
            history.push(`/tasks/${props.projectId}`);
          }}
        >
          {props.buttonDel}
        </Button>
      </TableCell>
      {/* </Link> */}
      {userInfo.permissions && (
        <TableCell align="right">
          {
            <Button
              variant="outlined"
              size="medium"
              onClick={() => {
                props.onClickShowModal(props.projectId, props.index);
              }}
            >
              {props.buttonUpdate}
            </Button>
          }
        </TableCell>
      )}
    </>
  );
};
