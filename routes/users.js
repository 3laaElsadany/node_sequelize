const express = require('express');
const router = express.Router();
const {
  User,
  Post
} = require('../models/Index');


router.route('/')
  .get((req, res, next) => {
    User.findAll()
      .then(users => {
        res.json(users);
      })
  })
  .post((req, res, next) => {
    User.create(req.body)
      .then((user) => {
        res.json(user);
      })
      .catch(err => {
        res.status(400).json({
          message: err.message
        })
      })
  })

router.route('/:id/posts')
  .get((req, res, next) => {
    User.findAll({
        where: {
          id: req.params.id
        },
        include: [Post]
      })
      .then(result => {
        res.json(result);
      })
  })

module.exports = router;