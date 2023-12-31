import React, {useState} from 'react'
import Header from '../components/Header';
import { useToDoContext } from "../hooks/useToDoContext";
import { Link } from 'react-router-dom';
import { useAuthContext } from '../hooks/useAuthContext';

const AddToDo = () => {
    // save all the stuff the user types as they type it
    const [name, setName] = useState("");
    const [description, setDescription] = useState(null);
    const [dueDate, setDueDate] = useState(null);
    const [error, setError] = useState(null);
    const [forToday, setForToday] = useState(false);
    const [category, setCategory] = useState('Miscellaneous');
    const {toDos, categories, dispatch} = useToDoContext();
    const {user} = useAuthContext();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const newToDo = {title: name, 
            description, 
            dueDate, 
            completed: false, 
            forToday, 
            category    
        };
        console.log("Adding a new to do:", newToDo);

        const response = await fetch(
            process.env.REACT_APP_BACKEND_API_ENDPOINT,
            {
                method: 'POST',
                body: JSON.stringify(newToDo),
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization':`Bearer ${user.token}`
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
            console.log(json);
        }
    };
    //console.log("Categories from inside addToDo", categories, toDos);
  return (
    <div>
        <Header title={"Create a new to do"}/>
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
                    <button className="back-btn">Back to To dos</button>
                </Link>
                <button className="add-btn">Add to do</button>
            </div>
            {error && <div className="error">{error}</div>}
        </form>
    </div>
    
  )
}

export default AddToDo
