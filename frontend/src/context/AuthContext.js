import {createContext, useReducer, useEffect} from 'react';
export const AuthContext = createContext();
export const authReducer = (state, action) => {
    switch (action.type) {
        case 'LOGIN':
            console.log("whats up", action.payload);
            return {user: action.payload};
        case 'LOGOUT':
            return {user: null};
        default:
            return state;
    }
};

export const AuthContextProvider = ({children}) => {
    const [state, dispatch] = useReducer(authReducer, {
        user: null
    })

    // get the user info from localStorage if it is there
    // by default the localStorage returns json, and we need to convert to a js obj
    // note that we stored the user as json in localStorage on register or log in
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem('user'))
       
        // if there is a user, update the auth context via dispatch to match
        if (user) {
            console.log(`Fetching the user from local storage: ${user.email}`)
            dispatch({type: 'LOGIN', payload: user});
        }
    }, 
    []);
    
    console.log('AuthContext state: ', state); // logging the state
    return (
        <AuthContext.Provider value={{...state, dispatch}}>
            {children}
        </AuthContext.Provider>
    );
};
