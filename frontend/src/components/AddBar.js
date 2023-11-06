import React from 'react'
import { Link } from 'react-router-dom';
import { useToDoContext } from "../hooks/useToDoContext";

const AddBar = () => {
    const {dispatch} = useToDoContext();
    
  return (
    <div className="addBar">
    <select onChange={(e) => {
        console.log(`A change in selection${e.target.value}`)
        dispatch({type: e.target.value})
        }}>
        <option value="None">None</option>
        <option value="SORT_BY_DUE_DATE_INC">Date: Soonest due </option>
        <option value="SORT_BY_DUE_DATE_DEC">Date: Latest due </option>
        <option value="SORT_BY_NOTDONE_FIRST">Completion: Not Done First </option>
        <option value="SORT_BY_DONE_FIRST">Completion: Done First </option>
        <option value="SORT_BY_ALPHABETICAL_ORDER">Name: Alphabetical</option>
        <option value="SORT_BY_REVERSE_ALPHABETICAL_ORDER">Name: Reverse Alphabetical</option>
    </select>
    
    <Link to="/createToDo">+ Add To Do +</Link>
    <Link to="/createCategory">+ Add Category +</Link>
    <Link to="/daily">Today's To Dos</Link>
</div>
  )
}

export default AddBar
