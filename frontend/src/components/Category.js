import React from 'react'
import ToDo from './ToDo';
import { useToDoContext } from "../hooks/useToDoContext";
import {fetchDeleteCategory} from '../functions/fetchFunctions.js';
import {lightenColor} from '../functions/color';
import { useAuthContext } from '../hooks/useAuthContext';

const Category = ({props}) => {
    const {name, color, _id} = props;
    const {toDos, dispatch} = useToDoContext();
    const {user} = useAuthContext();

    const lighterColor = lightenColor(color, 25);
    //console.log(color, lighterColor);
    //backgroundColor: color,
    const divStyle = {
        background: `linear-gradient(to bottom right,${color}, ${lighterColor})`
    };
    //console.log("Inside category", name, toDos);

    return (
        <div className="category-box" style={divStyle}>
            <div className="top-bar">
                <h1>{name}</h1>
                <button 
                    id="trash-btn"
                    className="material-symbols-outlined"
                    onClick={() => {
                        fetchDeleteCategory(_id, user);
                        dispatch({type: 'DELETE_CATEGORY', payload: {_id}})
                        }
                    }
                >
                    Delete
                </button>
            </div>
            <div className="toDos">
                {toDos && toDos.
                    filter((toDo) => toDo.category === name
                    ).
                    map(
                        (toDo) => (<ToDo key={toDo._id} props={toDo}/>)
                    )
            }
            </div>
        </div>
    )
}

export default Category
