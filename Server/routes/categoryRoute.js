const express = require('express');
const router = express.Router();
const {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById
} = require('../controllers/categoryController');

router.post('/createCat', createCategory);
router.get('/getAllCat', getAllCategories);
router.get('/:id', getCategoryById);
router.put('/:id', updateCategoryById);
router.delete('/:id', deleteCategoryById);

module.exports = router;
