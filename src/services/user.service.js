const { User } = require('../models');
const { generateToken } = require('../utils/auth');
const { validateUser } = require('./validate/schema');

const getUser = async (email, password) => {
  if (!email || !password) return { message: 'Some required fields are missing' };

  const user = await User.findOne({ where: { email, password } });
  if (!user) return { message: 'Invalid fields' };
  const token = generateToken(user.dataValues);
  return token;
};

const getAllUser = async () => {
  const users = User.findAll({ attributes: { exclude: ['password'] } });
  return users;
};

const getUserById = async (id) => {
  const user = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });
  if (!user) return { message: 'User does not exist' };
  return user;
};

const createUser = async (newUser) => {
  const { error } = validateUser.validate(newUser);
  if (error) return { message: error.message, status: 400 };

  const userExists = await User.findOne({ where: { email: newUser.email } });
  if (userExists) return { message: 'User already registered', status: 409 };

  await User.create(newUser);
  const token = generateToken(newUser);
  return token;
};

module.exports = {
    getUser,
    createUser,
    getAllUser,
    getUserById,
};
