
import React, {useState} from 'react'
import Header from '../components/Header';
import {useLogin} from '../hooks/useLogin';


const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const {login, isLoading, error} = useLogin();
    const handleSubmit = async(e) => {
        e.preventDefault();
        console.log(email, password);
        login(email, password); // sends back json saves the token in local storage and frontend state
    };
    return (
        <div>
            <Header title={"Login"}/>
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
                <button className="add-btn">Log in</button>
            </form>
        </div>
    );
}
export default Login