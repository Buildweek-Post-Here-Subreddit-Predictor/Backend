const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authenticate = require("../auth/authenticate-middleware.js");
const authRouter = require("../auth/auth-router.js");
const UsersRouter = require("../users/users-Router.js");
//const redditRouter = require("../reddit/reddit-router.js");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/auth", authRouter);
server.use("/api/auth/users", UsersRouter);
//server.use("/api/reddit", authenticate, redditRouter);

server.get("/", (req, res) => {
  res.status(200).send({ message: "Good to go." });
});

module.exports = server;
