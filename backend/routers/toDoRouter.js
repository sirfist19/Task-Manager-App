const express = require('express');
const router = express.Router();
const {
    getAllToDos, 
    createToDo,
    toggleCompleteWithId,
    toggleForTodayWithId,
    deleteToDoWithId
} = require('../controllers/toDoController');

router.get('/', getAllToDos);
router.post('/', createToDo);
router.patch('/complete/:id', toggleCompleteWithId);
router.patch('/today/:id', toggleForTodayWithId);
router.delete('/:id', deleteToDoWithId);

module.exports = router;