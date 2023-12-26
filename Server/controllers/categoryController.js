const { Category, categoryValidationSchema } = require('../models/categoryModel');

// Create
const createCategory = async (req, res) => {
    const { error } = categoryValidationSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let category = new Category(req.body);
    category = await category.save();

    res.send(category);
};

// Read
const getAllCategories = async (req, res) => {
    const categories = await Category.find();
    res.send(categories);
};

const getCategoryById = async (req, res) => {
    const category = await Category.findById(req.params.id);
    if (!category) return res.status(404).send('The category with the given ID was not found.');

    res.send(category);
};

// Update
const updateCategoryById = async (req, res) => {
    const { error } = categoryValidationSchema.validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    const category = await Category.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!category) return res.status(404).send('The category with the given ID was not found.');

    res.send(category);
};

// Delete
const deleteCategoryById = async (req, res) => {
    const category = await Category.findByIdAndRemove(req.params.id);
    if (!category) return res.status(404).send('The category with the given ID was not found.');

    res.send(category);
};

module.exports = {
    createCategory,
    getAllCategories,
    getCategoryById,
    updateCategoryById,
    deleteCategoryById
};
