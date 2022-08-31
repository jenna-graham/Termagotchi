const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
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

    return user;
  }

  static async signIn({ username, password = '' }) {
    try {
      const user = await User.getByUsername(username);
      if(!user) throw new Error('Invalid username');
      if (!bcrypt.compareSync(password, user.passwordHash))
        throw new Error('Invalid password');
      const token = jwt.sign({ ...user }, process.env.JWT_SECRET, {
        expiresIn: '1 day',
      });
      return token;
    } catch (error) {
      error.status = 401;
      throw error;
    }
  }
};
