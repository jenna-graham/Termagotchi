const bcrypt = require('bcrypt');
// const jwt = require('jsonwebtoken');
const User = require('../models/User');

module.exports = class UserService {
  static async create({ username, password }) {
    const passwordHash = await bcrypt.hash(
      password,
      Number(process.env.SALT_ROUNDS)
    );

    const user = await User.insert({
      username,
      passwordHash,
    });

    // const token = jwt.sign({ ...user }, process.env.JWT_SECRET, {
    //   expiresIn: '1 day', 
    // });

    return user;
  }
};
