const jwt = require("jsonwebtoken");
const tables = require("../../database/tables");
const { verifyPassword } = require("../services/auth");

const { APP_SECRET } = process.env;

const login = async (req, res, next) => {
  try {
    const [user] = await tables.user.readByEmail(req.body.email);

    const verified = user
      ? await verifyPassword(user.password, req.body.password)
      : false;

    if (verified) {
      delete user.password;
      const token = jwt.sign(user, APP_SECRET);
      res
        .cookie("token", token, {
          httpOnly: true,
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24),
        })
        .json(user);
    } else {
      res.sendStatus(422);
    }
  } catch (err) {
    next(err);
  }
};

const logout = async (req, res, next) => {
  try {
    res.clearCookie("token").sendStatus(200);
  } catch (err) {
    next(err);
  }
};

module.exports = {
  login,
  logout,
};
