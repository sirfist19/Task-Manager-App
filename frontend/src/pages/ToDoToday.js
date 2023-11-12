import React from 'react'
import Header from '../components/Header';
import {formatDate} from '../functions/formatDate.js';
import { useToDoContext } from "../hooks/useToDoContext";
import ToDo from '../components/ToDo';
import AddBar from '../components/AddBar';
import ToDoDetailsFunctionality from '../components/ToDoDetailsFunctionality';

const ToDoToday = () => {
  const {toDos} = useToDoContext();
    
  return (
    <div>
      <Header title={"To get done TODAY! BACK"}/>
      <h1>Today's Date: {formatDate(Date.now())}</h1>
      <AddBar/>
      <ToDoDetailsFunctionality/>
      <div className="toDos">
        {toDos.
          filter((toDo) => toDo.forToday === true
          ).
          map(
              (toDo) => (<ToDo key={toDo._id} props={toDo}/>)
          )
        }
      </div>
    </div>
  )
}

export default ToDoToday
