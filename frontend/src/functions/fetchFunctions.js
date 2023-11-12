const API_ENDPOINT = process.env.REACT_APP_BACKEND_API_ENDPOINT;

// Gets and returns all to dos
export const fetchToDos = async (user) => {
    try {
         // get all the todos
        console.log("Fetching to dos", API_ENDPOINT);
        
        const response = await fetch(API_ENDPOINT, {
            headers: {
                'Authorization':`Bearer ${user.token}`
            }});
    
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
export const fetchCategories = async (user) => {
    try {
        const path = API_ENDPOINT + `/category`;
        console.log(`Fetching categories from ${path}`);
        const response = await fetch(path, {
            headers: {
                'Authorization':`Bearer ${user.token}`
            }});
    
        if (response.ok) {
            const json = await response.json();
            return json;
        }
    } catch (error) {
        console.log(error);
        return null;
    }
};

export const fetchCreateCategory = async(user, name, color) => {
    const newCategory = {name: name, color: color};
    const response = await fetch(
        process.env.REACT_APP_BACKEND_API_ENDPOINT + '/category',
        {
            method: 'POST',
            body: JSON.stringify(newCategory),
            headers: {
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${user.token}`
            }
        }    
    );

    const json = await response.json();
    if (response.ok) {
        return json;
    }
    else {
        console.log(json, json.error);
        return null;
    }
};

export const fetchEditToDo = async(_id, user, newToDo) => {
    console.log("Editing a to do:", newToDo);

    const response = await fetch(
        process.env.REACT_APP_BACKEND_API_ENDPOINT + `/${_id}`,
        {
            method: 'PATCH',
            body: JSON.stringify(newToDo),
            headers: {
                'Content-Type': 'application/json',
                'Authorization':`Bearer ${user.token}`
            }
        }    
    );
    const json = response.json();
    if (response.ok) {
        return json;
    } else {
        console.log(json.error);
        return null;
    }
};
// Changes a to do from Completed to Not completed and vice versa
export const fetchToggleCompleted = async(_id, user) => {
        const path = API_ENDPOINT + `/complete/${_id}`;
        console.log(`Fetching from ${path}`);

        const response = await fetch(
            path,
            { method: 'PATCH', headers: {'Authorization':`Bearer ${user.token}`} }    
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
export const fetchToggleForToday = async(_id, user) => {
    const path = process.env.REACT_APP_BACKEND_API_ENDPOINT + `/today/${_id}`;
    console.log(`Fetching from ${path}`);

    const response = await fetch(
        path,
        { method: 'PATCH' , headers: {'Authorization':`Bearer ${user.token}`} }       
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
export const fetchDeleteToDo = async(_id, user) => {
        const path = process.env.REACT_APP_BACKEND_API_ENDPOINT + `/${_id}`;
        console.log(`Fetching from ${path}`);

        const response = await fetch(
            path,
            { method: 'DELETE' , headers: {'Authorization':`Bearer ${user.token}`} }      
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
export const fetchDeleteCategory = async(_id, user) => {
    const path = process.env.REACT_APP_BACKEND_API_ENDPOINT + `/category/${_id}`;
    console.log(`Fetching from ${path}`);

    const response = await fetch(
        path,
        { method: 'DELETE' , headers: {'Authorization':`Bearer ${user.token}`} }      
    );
    const json = response.json();
    if (response.ok) {
        console.log("Deleted a category")
    }
    else {
        console.log(json.error);
    }
};