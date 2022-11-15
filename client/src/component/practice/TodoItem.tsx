
import classes from'./TodoItem.module.css'
const TodoItem: React.FC<{text:string; onAddRemov:()=>void} > =(props)=>{
return (
    <li className={classes.item} onClick={props.onAddRemov}>{props.text}</li>
)
}

export default TodoItem