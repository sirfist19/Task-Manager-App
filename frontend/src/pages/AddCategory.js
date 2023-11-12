import React, {useState} from 'react'
import Header from '../components/Header';
import { Link } from 'react-router-dom';
import { useToDoContext } from "../hooks/useToDoContext";
import { useAuthContext } from '../hooks/useAuthContext';
import  ColorSelection  from '../components/ColorSelection';
import { fetchCreateCategory } from '../functions/fetchFunctions';

const AddCategory = () => {
    const {dispatch} = useToDoContext();
    const [error, setError] = useState(null);
    const [name, setName] = useState('');
    let [color, setColor] = useState('');
    const {user} = useAuthContext();

    const handleSubmit = async(e) => {
        e.preventDefault();
        const res = await fetchCreateCategory(user, name, color);

        if (res) {
            setError(null);
            setName('');
            //console.log("New category to add json: ", json)
            dispatch({type: 'CREATE_CATEGORY', payload: res}); 
        }
    }
    return (
        <div>
            <Header title={"Create a new category"}/>
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
