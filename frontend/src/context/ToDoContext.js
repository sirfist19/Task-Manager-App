import React from 'react'
import { createContext, useReducer } from 'react';
import Category from '../components/Category';

// make the context 
export const ToDoContext = createContext();

// make the reducer
export const toDoReducer = (state, action) => {
    switch(action.type) {
        case 'SET_TODOS':
            return {
                ...state, 
                toDos: action.payload
            }
        case 'SET_CATEGORIES':
            return {
                ...state, 
                categories: action.payload
            }
        case 'CREATE_TODO':
            return {
                ...state,
                toDos: [...state.toDos, action.payload]
            }
        case 'CREATE_CATEGORY': 
            console.log("Category to add", action.payload);
            console.log("Current state:", state);
            return {
                ...state,
                categories: [...state.categories, action.payload]
            }
        case 'EDIT_TODO':
            return {
                ...state, 
                toDos: state.toDos.map(
                    (toDo) => {
                        if (toDo._id === action.payload._id) {
                            return action.payload;
                        }
                        return toDo;
                    }
                )
            }
        case 'TOGGLE_FOR_TODAY':
            return {
                ...state,
                toDos: state.toDos.map(
                    (toDo) => {
                        if (toDo._id === action.payload._id) {
                            return {
                                ...toDo,
                                forToday: !toDo.forToday,
                            };
                        }
                        return toDo;
                    }
                )
            }
        case 'TOGGLE_COMPLETE_BY_ID':
            return {
                ...state,
                toDos: state.toDos.map(
                    (toDo) => {
                        if (toDo._id === action.payload._id) {
                            return {
                                ...toDo,
                                completed: !toDo.completed,
                            };
                        }
                        return toDo;
                    }
                )
            }
        case 'SHOW_DETAILS_BY_ID':
            return {
                ...state,
                toDoDetails: {
                    show: true,
                    _id: action.payload._id
                }
            };
        case 'CLOSE_DETAILS':
            return {
                ...state, 
                toDoDetails: {
                    show: false,
                    _id: null
                }
            };
        case 'DELETE_TODO':
            return {
                ...state,
                toDos: state.toDos.filter(
                    (toDo) => toDo._id !== action.payload._id
                )
            }
        case 'DELETE_CATEGORY':
            return {
                ...state,
                categories: state.categories.filter(
                    (category) => category._id !== action.payload._id
                )
            }
        case 'SORT_BY_DUE_DATE_INC':
            return {
                ...state,
                toDos: state.toDos.sort(
                    (a, b) => {
                        // null dates (meaning no due date) a given extremely late due dates so they go last
                        const dueDateA = a.dueDate ? new Date(a.dueDate) : new Date('9999-12-31');
                        const dueDateB = b.dueDate ? new Date(b.dueDate) : new Date('9999-12-31');
                        return dueDateA - dueDateB; // if - a goes first, if + b goes first
                    } 
                )
            }
            case 'SORT_BY_ALPHABETICAL_ORDER':
                return {
                    ...state,
                    toDos: state.toDos.sort(
                        (a, b) => {
                            //console.log(a.title, b.title);
                            return a.title.localeCompare(b.title); 
                        } 
                    )
                }
                case 'SORT_BY_REVERSE_ALPHABETICAL_ORDER':
                    return {
                        ...state,
                        toDos: state.toDos.sort(
                            (a, b) => {
                                //console.log(a.title, b.title);
                                return -a.title.localeCompare(b.title); 
                            } 
                        )
                    }
        case 'SORT_BY_DUE_DATE_DEC':
            return {
                ...state,
                toDos: state.toDos.sort(
                    (a, b) => {
                        const dueDateA = a.dueDate ? new Date(a.dueDate) : new Date(0);
                        const dueDateB = b.dueDate ? new Date(b.dueDate) : new Date(0);
                        return dueDateB - dueDateA;
                    } 
                )
            }
        case 'SORT_BY_NOTDONE_FIRST':
            return {
                ...state, 
                toDos: state.toDos.sort(
                    (a, b) => {
                        if (a.completed) {
                            return 1; // b goes first
                        }
                        else {
                            return -1; // a goes first
                        }
                    }
                )
            }
            case 'SORT_BY_DONE_FIRST':
                return {
                    ...state, 
                    toDos: state.toDos.sort(
                        (a, b) => {
                            if (a.completed) {
                                return -1;
                            }
                            else {
                                return 1;
                            }
                        }
                    )
                }
        default:
            return state
    }
};

export const ToDoContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(
        toDoReducer, 
        {toDos: [], categories: [], toDoDetails: {_id: null, show: false}}
    ); 
    console.log("Initial state value: ", state);

    return (
        <ToDoContext.Provider value={{...state, dispatch}}>
            {children}
        </ToDoContext.Provider>
    )
}
