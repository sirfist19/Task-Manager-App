import React, { useEffect} from 'react'
import ToDo from '../components/ToDo';
import AddBar from '../components/AddBar';
import Header from '../components/Header';
import Category from '../components/Category';
import ToDoDetailsFunctionality from '../components/ToDoDetailsFunctionality'

import Navbar from '../components/Navbar';
import {fetchToDos, fetchCategories} from '../functions/fetchFunctions';
import { useToDoContext } from "../hooks/useToDoContext";
import { useAuthContext } from '../hooks/useAuthContext';

const Home = () => {
    const {toDos, toDoDetails, categories, dispatch} = useToDoContext();
    const {user} = useAuthContext();

    useEffect(() => {
        const getToDos = async () => {
            const response = await fetchToDos(user); // gets all to dos
            dispatch({type: 'SET_TODOS', payload: response});
        };
        const getCategories = async () => {
            const response = await fetchCategories(user); // gets categories
            dispatch({type: 'SET_CATEGORIES', payload: response});
        };
        getToDos();
        getCategories();
    }, [dispatch]);

    console.log("Main State:", toDos, categories, toDoDetails);
    
    return (
        <div>
            <Header title={"To do's"}/>
            <AddBar/>
            <ToDoDetailsFunctionality/>
            <div className="categories">
                {categories && categories.map(
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
