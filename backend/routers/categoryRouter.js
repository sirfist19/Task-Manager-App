const express = require('express');
const requireAuth = require('../middleware/requireAuth');
const router = express.Router();
const {
    getAllCategories, 
    createCategory,
    deleteCategoryWithId
} = require('../controllers/categoryController');

// with pre-path /api/category
router.use(requireAuth);
router.get('/', getAllCategories); 
router.post('/', createCategory);
router.delete('/:id', deleteCategoryWithId);

module.exports = router;