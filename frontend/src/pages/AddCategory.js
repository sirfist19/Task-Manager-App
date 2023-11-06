import React, {useState} from 'react'
import Navbar from '../components/Navbar';
import { Link } from 'react-router-dom';
import { useToDoContext } from "../hooks/useToDoContext";
import  ColorSelection  from '../components/ColorSelection';

const AddCategory = () => {
    const {dispatch} = useToDoContext();
    const [error, setError] = useState(null);
    const [name, setName] = useState('');
    let [color, setColor] = useState('');

    const handleSubmit = async() => {
        const newCategory = {name: name, color: color};

        const response = await fetch(
            process.env.REACT_APP_BACKEND_API_ENDPOINT + '/category',
            {
                method: 'POST',
                body: JSON.stringify(newCategory),
                headers: {
                    'Content-Type': 'application/json'
                }
            }    
        );

        const json = response.json();
        if (response.ok) {
            setError(null);
            setName('');
            dispatch({type: 'CREATE_CATEGORY', payload: json}); 
        }
        else {
            console.log(json.error);
        }
    }
    return (
        <div>
            <Navbar textToDisplay={"Create a new category"}/>
            <form className="create" onSubmit={handleSubmit}>
                <div className="input-row">
                    <label>Name:</label>
                    <input 
                        type="text"
                        onChange={(e)=>{setName(e.target.value)}}
                    />
                </div>
                <ColorSelection setColor={setColor}/>
                <div className="button-row">
                    <Link to='/'>
                        <button className="back-btn">Back to To dos</button>
                    </Link>
                    <button className="add-btn">Add Category</button>
                </div>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
      )
}

export default AddCategory
