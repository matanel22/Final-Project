import React from "react";
import Card from "../UI/card";
export interface IProps {
  _id: string;
  nameProject: string;
  staff: string;
  client: string;
  statusProject: string;
  amountOfUsers: string;
}
const UpdateProject: React.FC<{ UP: IProps[] }> = (props) => {
  return <Card>{props.UP}</Card>;
};
export default UpdateProject;
