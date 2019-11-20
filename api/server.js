const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const bcrypt = require("bcryptjs");

const authenticate = require("../auth/authenticate-middleware.js");
const authRouter = require("../auth/auth-router.js");
const UsersRouter = require("../users/users-Router.js");
const redditRouter = require("../reddit/reddit-router.js");
const {
  validateBody,
  validateUniqueUsername
} = require("../middleware/validate.js");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/auth", authRouter);
server.use("/api/auth/users", UsersRouter);
server.use("/api/reddit", authenticate, redditRouter);

server.get("/", (req, res) => {
  res.status(200).send({ message: "Good to go." });
});
server.post(
  "/register",
  validateBody,
  validateUniqueUsername,
  async (req, res) => {
    const { body } = req;
    const hash = bcrypt.hashSync(body.password, 12);
    body.password = hash;
    try {
      const response = await Users.createUser(body);
      if (response) {
        res.status(201).json(response);
      } else {
        res.status(400).json({ message: "User could not be created" });
      }
    } catch (error) {
      res.status(500).json(error);
    }
  }
);

server.post("/login", validateBody, async (req, res) => {
  const { body } = req;
  try {
    const user = await Users.login({ username: body.username });
    if (user) {
      const auth = bcrypt.compareSync(body.password, user.password);
      if (auth) {
        res.status(200).json({ message: `Welcome ${user.username}!` });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } else {
      res.status(400).json({ message: "Could not find user" });
    }
  } catch (error) {
    res.status(500).json(error);
  }
  server.get("/", restricted, (req, res) => {
    console.log("here");
    Users.find()
      .then(users => {
        res.json({ users, loggedInUser: req.user.username });
      })
      .catch(err => res.send(err));
  });
});

module.exports = server;
