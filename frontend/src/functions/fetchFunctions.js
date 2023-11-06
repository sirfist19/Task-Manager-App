const API_ENDPOINT = process.env.REACT_APP_BACKEND_API_ENDPOINT;

// Gets and returns all to dos
export const fetchToDos = async () => {
    try {
         // get all the todos
        console.log("Fetching to dos", API_ENDPOINT);
        const response = await fetch(API_ENDPOINT);
    
        if (response.ok) {
            const json = await response.json();
            return json;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
};

// Gets and returns all categories
export const fetchCategories = async () => {
    try {
        const path = API_ENDPOINT + `/category`;
        console.log(`Fetching categories from ${path}`);
        const response = await fetch(path);
    
        if (response.ok) {
            const json = await response.json();
            return json;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
};

// Changes a to do from Completed to Not completed and vice versa
export const fetchToggleCompleted = async(_id) => {
        const path = API_ENDPOINT + `/complete/${_id}`;
        console.log(`Fetching from ${path}`);

        const response = await fetch(
            path,
            { method: 'PATCH' }    
        );

        const json = response.json();
        if (response.ok) {
            //setError(null);
            //setName('');
            //setDescription('');
            //setDueDate(null);
            console.log("Toggled a todo completed value")
        }
        else {
            console.log(json.error);
        }
    };

// Changes a to do from not in for today to in for today and vice versa
export const fetchToggleForToday = async(_id) => {
    const path = process.env.REACT_APP_BACKEND_API_ENDPOINT + `/today/${_id}`;
    console.log(`Fetching from ${path}`);

    const response = await fetch(
        path,
        { method: 'PATCH' }    
    );

    const json = response.json();
    if (response.ok) {
        //console.log("Toggled a todo completed value")
    }
    else {
        console.log(json.error);
    }
};

// Deletes the passed in to do
export const fetchDeleteToDo = async(_id) => {
        const path = process.env.REACT_APP_BACKEND_API_ENDPOINT + `/${_id}`;
        console.log(`Fetching from ${path}`);

        const response = await fetch(
            path,
            { method: 'DELETE' }    
        );
        const json = response.json();
        if (response.ok) {
            //setError(null);
            //setName('');
            //setDescription('');
            //setDueDate(null);
            console.log("Deleted a todo")
        }
        else {
            console.log(json.error);
        }
};

// Deletes the passed in to do
export const fetchDeleteCategory = async(_id) => {
    const path = process.env.REACT_APP_BACKEND_API_ENDPOINT + `/category/${_id}`;
    console.log(`Fetching from ${path}`);

    const response = await fetch(
        path,
        { method: 'DELETE' }    
    );
    const json = response.json();
    if (response.ok) {
        console.log("Deleted a category")
    }
    else {
        console.log(json.error);
    }
};