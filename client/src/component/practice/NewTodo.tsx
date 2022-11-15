import { useRef } from "react"
import classes from './NewTodo.module.css'
const NewTodo: React.FC<{onAddTodo:(text:string)=>void}>=(props)=>{
    const textRef=useRef<HTMLInputElement>(null)
const submitHandler=(event:React.FormEvent)=>{
event.preventDefault()

const enteredText=textRef.current!.value

if(enteredText.trim().length=== 0){
    return
}

props.onAddTodo(enteredText);

textRef.current!.value=''

}


return (
    <form onSubmit={submitHandler} className={classes.form} >
        <label htmlFor="text"> Todo Text</label>
        <input  ref={textRef} type='text' id="text"/>
        <button>add Todo</button>
    </form>
)
}

export default NewTodo