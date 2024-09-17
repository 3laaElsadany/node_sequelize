const express = require('express');
const router = express.Router();
const {
  Category,
  Post
} = require('../models/Index');


router.route('/')
  .get((req, res, next) => {
    Category.findAll()
      .then(categories => {
        res.json(categories);
      })
  })
  .post((req, res, next) => {
    Category.create(req.body)
      .then((category) => {
        res.json(category);
      })
      .catch(err => {
        res.status(400).json({
          message: err.message
        })
      })
  })

router.route('/:id/posts')
  .get((req, res, next) => {
    Category.findAll({
        where: {
          id: req.params.id
        },
        include: [{
          model: Post,
          as: 'articles'
        }]
      })
      .then(result => {
        res.json(result);
      })
  })

module.exports = router;