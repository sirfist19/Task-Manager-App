import React, { useEffect} from 'react'
import ToDo from '../components/ToDo';
import AddBar from '../components/AddBar';
import Category from '../components/Category';
import ToDoDetailsFunctionality from '../components/ToDoDetailsFunctionality'

import Navbar from '../components/Navbar';
import {fetchToDos, fetchCategories} from '../functions/fetchFunctions';
import { useToDoContext } from "../hooks/useToDoContext";

const Home = () => {
    const {toDos, toDoDetails, categories, dispatch} = useToDoContext();

    useEffect(() => {
        const getToDos = async () => {
            const response = await fetchToDos(); // gets all to dos
            dispatch({type: 'SET_TODOS', payload: response});
        };
        const getCategories = async () => {
            const response = await fetchCategories(); // gets categories
            dispatch({type: 'SET_CATEGORIES', payload: response});
        };
        getToDos();
        getCategories();
    }, [dispatch]);

    console.log("Main State:", toDos, categories, toDoDetails);
    
    return (
        <div>
            <Navbar textToDisplay={"To do's"}/>
            <AddBar/>
            <ToDoDetailsFunctionality/>
            <div className="categories">
                {categories.map(
                    (category) => (<Category key={category._id} props={category}/>)
                )}
            </div>
            
        </div>
    )
}
/* 
    <div className="toDos">
                {toDos.map(
                        (toDo) => (<ToDo key={toDo._id} props={toDo}/>)
                    )}
            </div>
*/


export default Home
