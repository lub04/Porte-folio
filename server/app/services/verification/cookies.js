const jwt = require("jsonwebtoken");

const checkCookie = (req, res, next) => {
  const decoded = jwt.verify(req.cookies.token, process.env.APP_SECRET);
  if (decoded) {
    req.auth = decoded;
    next();
  } else {
    res.status(403).json({ message: "Token expiré ou invalide" });
  }
};
const optionalAuth = (req, res, next) => {
  if (req.cookies.token) {
    checkCookie(req, res, next);
  } else {
    req.auth = null;
    next();
  }
};

const checkUser = (req, res, next) => {
  if (req.auth) {
    next();
  } else {
    res.sendStatus(403);
  }
};

module.exports = {
  checkCookie,
  optionalAuth,
  checkUser,
};
