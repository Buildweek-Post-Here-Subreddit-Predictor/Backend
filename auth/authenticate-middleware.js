
const jwt = require("jsonwebtoken");
const secrets = require("../config/secrets.js");
const express = require("express");


module.exports = (req, res, next) => {
  const token = req.headers.authorization;

  if (token) {
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        // token expired or is invalid
        res.status(401).json({ message: "You shall not pass." });
      } else {
        // token is good
        req.user = { username: decodedToken.username };
        next();
      }
    });
  } else {
    res.status(400).json({ message: "No credentials provided." });
  }
};
function restricted(req, res, next) {
  console.log(req.session);
  if (req.session && req.session.user) {
    next();
  } else {
    res.status(401).json({ message: "missing required session" });
  }
}
module.exports = restricted;