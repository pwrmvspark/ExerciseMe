const router = require('express').Router()

let User = require('../models/user.model')

router.route('/').get((req, res) => {
  User.find()
  .then (users => res.json(users))
  .catch(err => res.status(400).json('Cannot get user info, error: ' + err))
})

router.route('/add').post((req, res) => {
  const username = req.body.username;
  const newUser = new User( {username} )

  newUser.save()
  .then(() => res.json('User has been added!'))
  .catch(err => res.status(400).json('Cannot add user, error: ' + err))
})

module.exports = router