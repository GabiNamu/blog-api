const { userService } = require('../services');

const getUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userToken = await userService.getUser(email, password);
  
    if (userToken.message) return res.status(400).json(userToken);
  
    return res.status(200).json({ token: userToken });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'internal error' });
  }
};

const getAllUser = async (req, res) => {
  try {
    const users = await userService.getAllUser();
    return res.status(200).json(users);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'internal error' });
  }
};

const getUserById = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await userService.getUserById(id);
    if (user.message) return res.status(404).json(user);
    return res.status(200).json(user);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: 'internal error' });
  }
};

const createUser = async (req, res) => {
    try {
        const newUserToken = await userService.createUser(req.body);
        if (newUserToken.message) {
            return res.status(newUserToken.status)
            .json({ message: newUserToken.message });
        } 
        return res.status(201).json({ token: newUserToken });
    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: 'internal error' });
    }
};

module.exports = {
    getUser,
    createUser,
    getAllUser,
    getUserById,
};