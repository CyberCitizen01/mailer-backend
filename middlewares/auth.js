const jwt = require("jsonwebtoken");
const {JWT_SECRET} = require('../config/config')

module.exports = function(req, res, next) {
  const token = req.header("AuthTokenString");
  if (!token) return res.status(401).json({ message: "Auth Error" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded.user;
    console.error('ok heroku it is working', token, decoded.user.id);
    next();
  } catch (e) {
    console.error(e);
    res.status(500).send({ message: "Invalid Token" });
  }
};
