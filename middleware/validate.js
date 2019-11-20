const db = require("../database/dbconfig.js");


const validateBody = (req, res, next) => {
  const { body } = req;

  if (body.username && body.password) {
    next();
  } else {
    res
      .status(400)
      .json({ message: "please enter a valid username and password" });
  }
};

const validateUniqueUsername = async (req, res, next) => {
  const { username } = req.body;

  try {
    const response = await db("users")
      .where({ username })
      .first();
    if (response) {
      res.status(400).json({ message: "username is already taken" });
    } else {
      next();
    }
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  validateBody,
  validateUniqueUsername
};
