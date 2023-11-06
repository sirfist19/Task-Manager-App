import { ToDoContext } from "../context/ToDoContext";
import {useContext} from 'react';

export const useToDoContext = () => {
    const context = useContext(ToDoContext); // gives us the state and dispatch
    //console.log("Context from useToDoContext: ", context);
    if (!context) {
        throw Error('UseToDoContext must be inside of ToDoContextProvider');
    }
    return context;
};