import React, { useState } from "react";
import Home from "./component/Home/Home";
import NewTodo from "./component/practice/NewTodo";
import AddNewProject from "./component/project/AddNewProject";
import Todo from "./component/practice/Todo";
import Todos from "./component/practice/Todos";
import AllProjects from "./component/project/AllProjects";
import { Route, Switch, Redirect, BrowserRouter } from "react-router-dom";
import TasksList from "./component/tasks/TasksList";
import TasksData from "./component/atom/Atom";
import { useRecoilState } from "recoil";
function App() {
  const [n, setN] = useRecoilState(TasksData);
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact>
          <Redirect to="/login" />
        </Route>
        <Route path="/login" exact>
          <Home />
        </Route>
        <Route path="/projects" exact>
          <AllProjects />
        </Route>
        <Route path="/createProject" exact>
          <AddNewProject />
        </Route>
        <Route path="/login" exact>
          <Home />
        </Route>
        <Route path="/tasks" exact>
          <TasksList></TasksList>
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
{
  /* <Layot>
<Switch>
  <Route path="/" exact>
    <Redirect to="quotes" />
  </Route>
  <Route path="/quotes" exact>
    <AllQuotes />
  </Route>

  <Route path="/quotes/:quoteId">
    <QuoteDetale />
  </Route>

  <Route path="/newQuotes">
    <NewQuotes />
  </Route>
</Switch>
</Layot> */
}

{
  /* <NewTodo onAddTodo={addTodoHandler}/>
      <Todos items={todos} onAddRemov={removTodo} /> */
}

{
  /* <AddNewProject/> */
}
// const [todos,setTodos]=useState<Todo[]>([])

//   const addTodoHandler=(todoText:string)=>{
// const newTodo = new Todo(todoText)
// setTodos((prevTodos)=>{
// return prevTodos.concat(newTodo)
// })
//   }
//   const removTodo=(todoId:string)=>{
//     setTodos(prevRemove =>{
//       return prevRemove.filter(item=>{
//         item.id!==todoId;
//       })
//     })

//   }
