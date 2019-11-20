const server = require('express').Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Users = require("../users/users-model.js");
const secrets = require("../config/secrets.js");
 // for endpoints beginning with /api/auth
server.post('/api/register', (req, res) => {
  let user = req.body;
  const hash = bcrypt.hashSync(user.password, 10); // 2 ^ n
  user.password = hash;

  Users.add(user)
    .then(saved => {
      res.status(201).json(saved);
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

server.post('/api/login', (req, res) => {
  let { username, password } = req.body;

  Users.findBy({ username })
    .first()
    .then(user => {
      
      // check password is correct
      if (!user || !bcrypt.compareSync(password, user.password)) {
        res.status(401).json({ message: 'Invalid Credentials' });
        
      } else {
        console.log(user)
        const token = generateToken(user)
        
        res.status(200).json({
          message: `Welcome ${user.username}!, have a token...`,
          token, // attach token as part of the response
        });
      }
    })
    .catch(error => {
      res.status(500).json(error);
    });
});

function generateToken(user) {
  const payload = {
    username: user.username
  }

  const options = {
    expiresIn: '1d'
  }
  // retrieve the secret from the secrets file
  return jwt.sign(payload, secrets.jwtSecret, options)
}

module.exports = server;
