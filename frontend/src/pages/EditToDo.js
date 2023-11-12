import React, {useState, useEffect} from 'react'
import Header from '../components/Header';
import { useToDoContext } from "../hooks/useToDoContext";
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';
import { fetchEditToDo } from '../functions/fetchFunctions';

const EditToDo = () => {
    // save all the stuff the user types as they type it
    const {toDos, toDoDetails, categories, dispatch} = useToDoContext();
    const {user} = useAuthContext();
    const toDoToEditId = toDoDetails._id;
    const toDoToEdit = toDos.filter((toDo) => (toDo._id === toDoToEditId));
    //console.log(toDoToEdit);

    const [name, setName] = useState("");
    const [description, setDescription] = useState(null);
    const [dueDate, setDueDate] = useState(null);
    const [error, setError] = useState(null);
    const [forToday, setForToday] = useState(false);
    const [category, setCategory] = useState('Miscellaneous');
    
    useEffect(() => {
        console.log("ToDoToEdit:",toDoToEdit);
        if(toDoToEdit) {
            const toDo = toDoToEdit[0];
            const name0 = toDo['title'];
            console.log("The name is:", name0)
            if (name0) {
                setName(name0);
            }
            const cat0 = toDo['category'];
            if (cat0) {
                setCategory(cat0);
            }
            const des0 = toDo['description'];
            if (des0) {
                setDescription(des0);
            }
            const due0 = toDo['dueDate'];
            if (due0) {
                setDueDate(due0);
            }
            const today0 = toDo['forToday'];
            if (today0) {
                setForToday(today0);
            }
        }
    }, []);

    const handleSubmit = async(e) => {
        e.preventDefault();
        const newToDo = {title: name, 
            description, 
            dueDate, 
            completed: false, 
            forToday, 
            category    
        };
        console.log("new to do for edit: ", newToDo);
        const res = fetchEditToDo(toDoToEditId, user, newToDo);

        if (res) {
            setError(null);
            setName('');
            setDescription('');
            setDueDate(null);
            setForToday(false);
            setCategory('');
            dispatch({type: 'EDIT_TODO', payload: res});
        }
    };
    //console.log("Categories from inside addToDo", categories, toDos);
  return (
    <div>
        <Header title={"Edit a to do"}/>
        <form className="create" onSubmit={handleSubmit}>
            <div className="input-row">
                <label>Name:</label>
                <input 
                    type="text"
                    onChange={(e)=>{
                        //console.log(`Changing the name to: ${e.target.value}`)
                        setName(e.target.value)}}
                    defaultValue={name}
                />
            </div>
            <div className="input-row">
                <label>Category:</label>
                <select
                    type="text"
                    onChange={(e)=>{
                        setCategory(e.target.value)
                    }}
                    defaultValue={category}
                >
                    {categories &&
                        categories.map(
                            (category) => (
                                <option key={category._id} value={category.name}>{category.name}</option>
                            )
                        )
                    }
                </select>
            </div>
            <div className="input-row">
                <label >Description:</label>
                <textarea 
                    type="text"
                    id="description-input"
                    onChange={(e)=>{setDescription(e.target.value)}}
                    defaultValue={description}
                />
            </div>
            
            <div className="input-row">
                <label>Due Date:</label>
                <input 
                    type="datetime-local"
                    onChange={(e)=>{setDueDate(e.target.value)}}
                    defaultValue={dueDate}
                />
            </div>
            <div className="input-row">
                <label>To get done today?:</label>
                <input 
                    type="checkbox"
                    onChange={(e)=>{setForToday(e.target.checked)}}
                    defaultValue={forToday}
                />
            </div>
            <div className="button-row">
                <Link to='/'
                    onClick={ ()=>// now that we have all the information about the to do, close the to do description opened on the home page
                        dispatch({type: 'CLOSE_DETAILS'})
                        }
                >
                    <button className="back-btn">Back to To dos</button>
                </Link>
                <button className="add-btn">Edit to do</button>
            </div>
            {error && <div className="error">{error}</div>}
        </form>
    </div>
    
  )
}

export default EditToDo
