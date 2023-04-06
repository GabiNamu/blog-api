const { Category } = require('../models');
const { validateCategory } = require('./validate/schema');

const createCategory = async (category) => {
  const { error } = validateCategory.validate(category);
  if (error) return { message: error.message };
  const newCategory = await Category.create(category);
  return newCategory;
};

const getAllCategories = async () => {
  const categories = await Category.findAll();
  return categories;
};

module.exports = {
    createCategory,
    getAllCategories,
};