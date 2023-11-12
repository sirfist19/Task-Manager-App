const mongoose = require('mongoose');
const {toDo} = require('../models/toDoSchema'); // import the schemas

const getAllToDos = async (req, res) => {
    const user_id = req.user._id;
    const allToDos = await toDo.find({user_id});
    res.status(200).json(allToDos);
};

const createToDo = async (req, res) => {
    console.log("Adding a new todo");
    const user_id = req.user._id;
    // get the data from the req
    const {
        title, 
        description, 
        dueDate, 
        completed,
        category,
        forToday,
    } = req.body;

    // read it and make a new obj
    try {
        const created_toDo = await toDo.create({
            title, 
            description, 
            dueDate, 
            completed,
            category,
            forToday,
            user_id
        }); // creates a new document in the db
        res.status(200).json(created_toDo);
    } catch (error) {
        console.log(error);
        res.status(400).json({error: error.message});
    } 
};
const editToDo = async(req, res) => {
    //const user_id = req.user._id;
    const {id} = req.params;
    const modToDo = req.body;
    console.log(`Editing a to-do with id ${id}`);
    console.log(modToDo);

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Not a valid id"});
    }

    const updatedToDo = await toDo.findByIdAndUpdate(
        id,
        modToDo,
        {new:true}
    );
    
    if (!updatedToDo) {
        return res.status(400).json({error: "No To Do found to modify"})
    }
    return res.status(200).json(updatedToDo);
};

const deleteToDoWithId = async (req, res) => {
    const msg = `Deleting the to do with id ${req.params.id}`;
    
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Not a valid id"});
    }

    const deletedToDo = await toDo.findOneAndDelete({_id: id});
    if (deletedToDo) {
        res.status(200).json({deletedToDo});
    }
    else {
        return res.status(400).json({error: "No To do found to delete."});
    }
}

const toggleCompleteWithId = async (req, res) => {
    const msg = `Toggling the completed property with id ${req.params.id}`;
    
    const {id} = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Not a valid id"});
    }

    const existingToDo = await toDo.findOne({_id: id});
    let newToDo = null;
    if (existingToDo) {
        existingToDo.completed = !existingToDo.completed;
        
        newToDo = await existingToDo.save();
    }
  
    if(!newToDo) {
        return res.status(400).json({error: 'No to do found to update'});
    }

    res.status(200).json({newToDo});
};

const toggleForTodayWithId = async (req, res) => {
    const msg = `Toggling the completed property with id ${req.params.id}`;
    
    const {id} = req.params;
    
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Not a valid id"});
    }

    const existingToDo = await toDo.findOne({_id: id});
    let newToDo = null;
    if (existingToDo) {
        existingToDo.forToday = !existingToDo.forToday;
        newToDo = await existingToDo.save();
    }
  
    if(!newToDo) {
        return res.status(400).json({error: 'No to do found to update'});
    }

    res.status(200).json({newToDo});
};

module.exports = {
    getAllToDos,
    createToDo,
    editToDo,
    toggleCompleteWithId,
    toggleForTodayWithId,
    deleteToDoWithId
};