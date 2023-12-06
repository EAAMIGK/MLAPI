const jwt = require("jsonwebtoken");
const { User } = require("../database/index.js");

const { secretKey } = require("../config.js");
exports.protect = async (req, res, next) => {
  let token = null;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer ")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(403).json({
      success: false,
      message: "Not authorized!",
    });
  }

  try {
    const decoded = jwt.verify(token, secretKey);

    const foundUser = await User.findByPk(decoded.userId);

    if (foundUser) {
      req.userId = foundUser.id;
      next();
    } else {
      return res.status(403).json({
        success: false,
        message: "Not authorized!",
      });
    }
  } catch (e) {
    return res.status(403).json({
      success: false,
      message: e.message,
    });
  }
};
