const { User } = require('../models');
const { generateToken } = require('../utils/auth');

const getUser = async (email, password) => {
  if (!email || !password) return { message: 'Some required fields are missing' };

  const user = await User.findOne({ where: { email, password } });
  if (!user) return { message: 'Invalid fields' };
  const token = generateToken(user.dataValues);
  return token;
};

module.exports = {
    getUser,
};
