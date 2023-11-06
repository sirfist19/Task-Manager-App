import React, {useState} from 'react'
import Navbar from '../components/Navbar';
import { useToDoContext } from "../hooks/useToDoContext";
import { Link } from 'react-router-dom';

const AddToDo = () => {
    // save all the stuff the user types as they type it
    const [name, setName] = useState("");
    const [description, setDescription] = useState(null);
    const [dueDate, setDueDate] = useState(null);
    const [error, setError] = useState(null);
    const [forToday, setForToday] = useState(false);
    const [category, setCategory] = useState('');
    const {toDos, categories, dispatch} = useToDoContext();

    const handleSubmit = async(e) => {
        const newToDo = {title: name, 
            description, 
            dueDate, 
            completed: false, 
            forToday, 
            category    
        };
        console.log(newToDo);

        const response = await fetch(
            process.env.REACT_APP_BACKEND_API_ENDPOINT,
            {
                method: 'POST',
                body: JSON.stringify(newToDo),
                headers: {
                    'Content-Type': 'application/json'
                }
            }    
        );

        const json = response.json();
        if (response.ok) {
            setError(null);
            setName('');
            setDescription('');
            setDueDate(null);
            setForToday(false);
            setCategory('');
            dispatch({type: 'CREATE_TODO', payload: json});
        }
        else {
            console.log(json.error);
        }
    };
    console.log("Categories from inside addToDo", categories, toDos);
  return (
    <div>
        <Navbar textToDisplay={"Create a new to do"}/>
        <form className="create" onSubmit={handleSubmit}>
            <div className="input-row">
                <label>Name:</label>
                <input 
                    type="text"
                    onChange={(e)=>{setName(e.target.value)}}
                />
            </div>
            <div className="input-row">
                <label>Category:</label>
                <select
                    type="text"
                    onChange={(e)=>{
                        setCategory(e.target.value)
                    }}
                >
                    {
                        categories.map(
                            (category) => (
                                <option value={category.name}>{category.name}</option>
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
                />
            </div>
            
            <div className="input-row">
                <label>Due Date:</label>
                <input 
                    type="datetime-local"
                    onChange={(e)=>{setDueDate(e.target.value)}}
                />
            </div>
            <div className="input-row">
                <label>To get done today?:</label>
                <input 
                    type="checkbox"
                    onChange={(e)=>{setForToday(e.target.checked)}}
                />
            </div>
            <div className="button-row">
                <Link to='/'>
                    <button class="back-btn">Back to To dos</button>
                </Link>
                <button class="add-btn">Add to do</button>
            </div>
            {error && <div className="error">{error}</div>}
        </form>
    </div>
    
  )
}

export default AddToDo
