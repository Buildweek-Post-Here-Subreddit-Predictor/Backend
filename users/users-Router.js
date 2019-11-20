const router = require('express').Router();

const Users = require('./users-model.js');
const restricted = require('../auth/authenticate-middleware.js');

router.get('/', restricted, (req, res) => {
    console.log('here');
    Users.find()
        .then(users => {
            res.json({ users, loggedInUser: req.user.username });
        })
        .catch(err => res.send(err));
});
module.exports = router;