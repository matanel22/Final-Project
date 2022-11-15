import React from "react";
import Todo from "./Todo";
import TodoItem from "./TodoItem";

import classes from './Todos.module.css'
const Todus: React.FC <{items:Todo[];onAddRemov:(id:string)=>void}>=(props)=>{

return (
    <ul>
{props.items.map((item)=>
<li key={item.id} className={classes.todos}>
  <TodoItem key={item.id} text={item.text} onAddRemov={props.onAddRemov.bind(null,item.id)}/>
</li>
)}
</ul>
)

}

export default Todus