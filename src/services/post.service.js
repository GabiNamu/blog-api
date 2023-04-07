const { Sequelize } = require('sequelize');
const config = require('../config/config');

const env = process.env.NODE_ENV || 'development';
const sequelize = new Sequelize(config[env]);
const { PostCategory, BlogPost, Category, User } = require('../models');
const { validatePost } = require('./validate/schema');

const findCategories = async (ids) => {
    const category = await Category.findAndCountAll({ where: { id: ids } });
    return category;
};

const validateNewPost = async ({ title, content, categoryIds }) => {
    const { error } = validatePost.validate({ title, content, categoryIds });
    if (error) return { message: 'Some required fields are missing' };
    const categoryIsValid = await findCategories(categoryIds);
    if (categoryIds.length !== categoryIsValid.count) {
        return { message: 'one or more "categoryIds" not found' };
    }
    return { message: '' };
};

const createNewPost = async ({ title, content, categoryIds }, user) => {
    const validate = await validateNewPost({ title, content, categoryIds });
    if (validate.message !== '') return validate;

    const result = await sequelize.transaction(async (t) => {
        const post = await BlogPost.create({
            title, content, userId: user.id, published: new Date(), updated: new Date(),
          }, { transaction: t });
         await PostCategory.bulkCreate(categoryIds.map((cat) => (
          {
            postId: post.id,
            categoryId: cat,
          }
    )), { transaction: t });
          return post;
    });
    return result;
};

const getAllPosts = async () => {
  const posts = await BlogPost.findAll(
    { include: [
    { model: User, as: 'user', attributes: { exclude: ['password'] } }, 
    { model: Category, as: 'categories', through: { attributes: [] } }] },
);
return posts;
};

const getPostById = async (id) => {
    const post = await BlogPost.findOne({ 
        where: { id },
        include: [
            { model: User, as: 'user', attributes: { exclude: ['password'] } }, 
            { model: Category, as: 'categories', through: { attributes: [] } }],
    });
    if (!post) return { message: 'Post does not exist' };
    return post;
};

module.exports = {
    createNewPost,
    getAllPosts,
    getPostById,
};