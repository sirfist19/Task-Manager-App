const mongoose = require('mongoose');
const {category} = require('../models/toDoSchema'); // import the schemas

const getAllCategories = async (req, res) => {
    console.log("Getting all categories in backend");
    const allToCategories = await category.find({});
    res.status(200).json(allToCategories);
};

const createCategory = async (req, res) => {
    console.log("Adding a new category");
    // get the data from the req
    const {
        name,
        color
    } = req.body;

    // read it and make a new obj
    try {
        const created_category = await category.create({
            name,
            color
        }); // creates a new document in the db
        res.status(200).json(created_category);
    } catch (error) {
        console.log(error);
        res.status(400).json({error: error.message});
    }
};

const deleteCategoryWithId = async (req, res) => {
    const msg = `Deleting the category with id ${req.params.id}`;
    
    const {id} = req.params;
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: "Not a valid id"});
    }

    const deletedToDo = await category.findOneAndDelete({_id: id});
    if (deletedToDo) {
        res.status(200).json({deletedToDo});
    }
    else {
        return res.status(400).json({error: "No category found to delete."});
    }
}

module.exports = {
    getAllCategories,
    createCategory,
    deleteCategoryWithId
};