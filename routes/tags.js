const express = require('express');
const router = express.Router();
const {
  Tag,
  Post
} = require('../models/Index');


router.route('/')
  .get((req, res, next) => {
    Tag.findAll()
      .then(tags => {
        res.json(tags);
      })
  })
  .post((req, res, next) => {
    Tag.create(req.body)
      .then((tag) => {
        res.json(tag);
      })
      .catch(err => {
        res.status(400).json({
          message: err.message
        })
      })
  })

router.route('/:id/posts')
  .get((req, res, next) => {
    Tag.findAll({
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