import React from 'react'
import Navbar from '../components/Navbar';
import {formatDate} from '../functions/formatDate.js';
import { useToDoContext } from "../hooks/useToDoContext";
import ToDo from '../components/ToDo';
import AddBar from '../components/AddBar';
import ToDoDetailsFunctionality from '../components/ToDoDetailsFunctionality';

const ToDoToday = () => {
  const {toDos} = useToDoContext();
    
  return (
    <div>
      <Navbar textToDisplay={"To get done TODAY!"}/>
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
