import { useAuthContext } from "./useAuthContext";
import { useToDoContext } from "./useToDoContext";

export const useLogout = () => {
    const {dispatch: authDispatch} = useAuthContext();
    const {dispatch: toDoDispatch} = useToDoContext();

    const logout = () => {
        // we don't need to send a req to the backend
        // we need to erase our frontend global state
        authDispatch({type: 'LOGOUT'});

        // clear the global workouts state
        toDoDispatch({type: 'SET_TODOS', payload: []})
        toDoDispatch({type: 'SET_CATEGORIES', payload: []})
        // and we need to erase our local storage token
        localStorage.removeItem('user');
    };
    return {logout};
};