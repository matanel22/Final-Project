import React from "react";

import classes from "./Card.module.css";

const Card = (props) => {
  return (
    // We add props.classsName so that in other files it will know how to contain them because card is a personal tag
    <div className={` ${classes.Card} ${props.className} `}>
      {props.children}
    </div>
  );
};
export default Card;
