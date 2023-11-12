/* 
ONE Detailed popup that comes up to tell you 
everything about a given to do 
*/


import React from 'react'
import {formatDate} from '../functions/formatDate.js';
import {fetchToggleCompleted, fetchDeleteToDo, fetchToggleForToday} from '../functions/fetchFunctions.js';
import { useToDoContext } from "../hooks/useToDoContext";
import { useAuthContext } from '../hooks/useAuthContext.js';
import {Link} from 'react-router-dom';

const ToDoDetails = ({props}) => {
    const {title, 
        description,
        dueDate, 
        completed,
        category,
        forToday, 
        _id} = props;
    const completedStr = completed ? "Done" : "Not Done";
    const completedId = completed ? "completed-button" : "notCompleted-button";
    const forTodayStr = forToday ? "Yes" : "No";
    const {dispatch} = useToDoContext();
    const {user} = useAuthContext();

    let formattedDueDate = "Due Date not set";
    if (dueDate) {
        formattedDueDate = formatDate(dueDate);
    }

    /* 
        All the details of the to do will be displayed here
            Should show 
            name:
            due date:
            category: (when it is added)
            description:
            completed:

            And this should cover a large part of the screen
    */
   const closePopup = () => {
        dispatch({type: 'CLOSE_DETAILS'});
   };

    return (
        <div id="toDoDetails">
                <h1>To do details!</h1>
            <button 
                className="close-btn"
                onClick={closePopup}
            >X</button>
            <h4 id="title">
                <strong>{title}</strong>
            </h4>
            <h4>Category: {category}</h4>
            <h4>For Today: {forTodayStr}</h4>
            <h4 id="dueDate">
                <span><strong>Due On: </strong></span> 
                {formattedDueDate}
            </h4>
            <p>{description}</p>
            <button 
                className="complete-btn"
                
                onClick={() => {
                    fetchToggleCompleted(_id, user);
                    dispatch({type: 'TOGGLE_COMPLETE_BY_ID', payload: {_id}});
                }} 
                id={completedId}>
                {completedStr}
            </button>
            <button
                className="add-today-todo"
                onClick={() => {
                    // complete both the backend and frontend global state operation to update the forToday property
                    fetchToggleForToday(_id, user);
                    dispatch({type: 'TOGGLE_FOR_TODAY', payload: {_id}})
                }}  
            >
                Add to Today's To Do's
            </button>
            <Link
                className="edit-todo-btn"
                to="/editToDo"
            >
                Edit
            </Link>
            <button 
                id="trash-btn"
                className="material-symbols-outlined"
                onClick={() => {
                    fetchDeleteToDo(_id, user)
                    dispatch({type: 'DELETE_TODO', payload: {_id}})
                    }
                }
            >
                Delete
            </button>
        </div>
  )
}

export default ToDoDetails
