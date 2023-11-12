import {useState} from 'react';
import { useAuthContext } from './useAuthContext';

export const useLogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const {dispatch} = useAuthContext();

    const login = async (email, password) => {
        console.log("in the login fxn")
        setIsLoading(true);
        setError(null);

        const path = process.env.REACT_APP_BACKEND_API_ENDPOINT + '/user/login';
        console.log(path);
        const response = await fetch(path, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password})
            });
        const json = await response.json();
        console.log("Backend response:", json)
        if (response.ok) {
            setIsLoading(false);

            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json));

            // update the auth context with the email and user
            dispatch({type: 'LOGIN', payload: json});
            
        } else {
            setIsLoading(false);
            setError(json.error);
            console.log("Error for logging in", json.error);
        }

    }
    return {login, isLoading, error};
};

