import { AuthContext } from "../context/AuthContext";
import {useContext} from 'react';
export const useAuthContext = () => {
    const context = useContext(AuthContext); // gives us back the state and dispatch which is stored in const context
    
    // check to make sure that the context is valid
    //      if we are calling this fxn from outside of where 
    //      context is provided then the context will just be null
    if (!context) {
        throw Error('useAuthContext must be used inside of AuthContextProvider');
    }
    return context; 
}