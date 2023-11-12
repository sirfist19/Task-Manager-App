import React, {useState, useEffect} from 'react'
import Header from '../components/Header';
import {useRegister} from '../hooks/useRegister';
import { fetchCreateCategory } from '../functions/fetchFunctions';
import { useToDoContext } from '../hooks/useToDoContext';

const Register = () => {
    const {dispatch} = useToDoContext();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {register, isLoading, error, isSuccessful} = useRegister();
    const [hasRegistered, setHasRegistered] = useState(false);

    const createDefaultCategory = async(user) => {
        console.log("Creating a default category")
        const res = await fetchCreateCategory(user, 
            'Miscellaneous',
            '#323ca8' );
        if (res) {
            dispatch({type: 'CREATE_CATEGORY', payload: res});
        }
    };

    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(email);
        const user = await register(email, password);
        //setHasRegistered(true);
        // Now that the user has registered, set up a default category
        //  called Misc where to dos that are not placed in a category 
        //  default to 
        //await createDefaultCategory();
        console.log("handle submit about to create default category", user, hasRegistered)
        if (user) {
            await createDefaultCategory(user);
        }
    };

    /*useEffect(()=>{
        console.log("IN THE USE EFFECT", user, hasRegistered)
        if (user && hasRegistered) {
            createDefaultCategory();
        }
    }, [user, hasRegistered]);
    */
    return (
        <div>
            <Header title={"Register"}/>
            <form className="create" 
            onSubmit={handleSubmit}
            >
                <div className="input-row">
                    <label>Email:</label>
                    <input type="email"
                    onChange= {(e) => setEmail(e.target.value)}
                    value={email}
                    />
                </div>
                <div className="input-row">
                    <label>Password:</label>
                    <input type="password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                    />
                </div>
                <button className="add-btn">Register</button>
                {isSuccessful && <h1 className="success-msg">Registered Successfully</h1>}
                {error && <h1 className="failure-msg">{error.message}</h1>}
            </form>
        </div>
    );
}
export default Register
