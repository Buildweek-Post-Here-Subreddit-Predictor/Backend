const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const authenticate = require("../auth/authenticate-middleware.js");
const authRouter = require("../auth/auth-router.js");
//const redditRouter = require("../reddit/reddit-router.js");

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use("/api/auth", authRouter);
//server.use("/api/reddit", authenticate, redditRouter);

server.get("/", (req, res) => {
  res.status(200).send({ message: "Good to go." });
});

module.exports = server;
