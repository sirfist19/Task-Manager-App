import {useState} from 'react';
import { useAuthContext } from './useAuthContext';
export const useRegister = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(null);
    const [isSuccessful, setIsSuccessful] = useState(false);
    

    const {dispatch} = useAuthContext();
    const register = async (email, password) => {
        setIsLoading(true);
        setError(null);
        const path = process.env.REACT_APP_BACKEND_API_ENDPOINT + '/user/register';
        const response = await fetch(path, {
                method: 'POST',
                headers: {'Content-Type': 'application/json'},
                body: JSON.stringify({email, password})
            });
        const json = await response.json();
        if (response.ok) {
            setIsLoading(false);
            setIsSuccessful(true);
            
            // save the user to local storage
            localStorage.setItem('user', JSON.stringify(json));
            // update the auth context with the email and user
            dispatch({type: 'LOGIN', payload: json});
            return json; // return the user so that a default category can be made
        } else {
            setIsLoading(false);
            setIsSuccessful(false);
            setError(json.error);
        }
    }
    return {register, isLoading, error, isSuccessful};
};

