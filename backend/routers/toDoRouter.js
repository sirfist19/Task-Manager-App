const express = require('express');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();
const {
    getAllToDos, 
    createToDo,
    toggleCompleteWithId,
    toggleForTodayWithId,
    deleteToDoWithId,
    editToDo
} = require('../controllers/toDoController');

router.use(requireAuth);
router.get('/', getAllToDos);
router.post('/', createToDo);
router.patch('/:id', editToDo);
router.patch('/complete/:id', toggleCompleteWithId);
router.patch('/today/:id', toggleForTodayWithId);
router.delete('/:id', deleteToDoWithId);

module.exports = router;