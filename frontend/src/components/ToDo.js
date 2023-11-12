/* 
ONE individual to-do that shows up as a bar with the
to do title
due date
complete
and trash button
*/


import React from 'react'
import {formatDate} from '../functions/formatDate.js';
import {fetchToggleCompleted, fetchDeleteToDo} from '../functions/fetchFunctions.js';
import { useToDoContext } from "../hooks/useToDoContext";
import { useAuthContext } from '../hooks/useAuthContext.js';

const ToDo = ({props}) => {
    const {title, dueDate, completed, _id} = props;
    const completedStr = completed ? "Done" : "Not Done";
    const completedId = completed ? "completed-button" : "notCompleted-button";

    const {dispatch} = useToDoContext();
    const {user} = useAuthContext();
    
    let formattedDueDate = "Due Date not set";
    if (dueDate) {
        formattedDueDate = formatDate(dueDate);
    }
    
    return (
        <div id="toDo">
            <h4 id="title"
                onClick={() => {
                    dispatch({type: 'SHOW_DETAILS_BY_ID', payload: {_id}});
                }}
            >
                <strong>{title}</strong>
            </h4>
            <h4 id="dueDate">
                <span><strong>Due On: </strong></span> 
                {formattedDueDate}
            </h4>
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

export default ToDo
