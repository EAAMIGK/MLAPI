const { User } = require("../database/index");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { secretKey, expiresIn } = require("../config.js");

exports.register = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const createdUser = await User.create({
      username: username,
      password: hashedPassword,
    });

    res.status(201).json({
      success: true,
      user: createdUser,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const { username, password } = req.body;

    const foundUser = await User.findOne({ where: { username: username } });

    if (!foundUser) {
      return res.status(401).json({
        success: false,
        message: "Invalid password or username",
      });
    }
    // const hashedPassword = await bcrypt.hash(password, 10);

    const passwordMatch = await bcrypt.compare(password, foundUser.password);

    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        message: "Invalid password or username",
      });
    }

    const authToken = jwt.sign({ userId: foundUser.id }, secretKey, {
      expiresIn: expiresIn,
    });

    res.status(200).json({
      success: true,
      user: foundUser,
      authToken: authToken,
    });
  } catch (e) {
    res.status(400).json({
      success: false,
      message: e.message,
    });
  }
};
