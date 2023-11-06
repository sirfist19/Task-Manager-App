import React from 'react'
import ToDoDetails from './ToDoDetails'
import { useToDoContext } from "../hooks/useToDoContext";
    
const ToDoDetailsFunctionality = () => {
  const {toDos, toDoDetails} = useToDoContext();
  return (
    <div className="toDoDetails">
        {toDos.map(
            (toDo) => {
                if (toDoDetails.show && toDo._id === toDoDetails._id) {
                    // show the detail of that todo
                    return <ToDoDetails key={toDo._id} props={toDo}/>
                }
                else {
                    return null;
                }
            }
        )
        }
    </div>
  )
}

export default ToDoDetailsFunctionality
