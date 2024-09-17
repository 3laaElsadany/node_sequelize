const express = require('express');
const router = express.Router();
const {
  Category,
  Post,
  Tag,
  User
} = require('../models/Index')


router.route('/:id?')
  .get((req, res, next) => {
    let params = req.params;
    let query;
    if (params.id) {
      query = Post.findOne({
        where: {
          id: params.id
        }
      });
    } else {
      query = Post.findAll();
    }

    query.then(result => {
      res.json(result);
    });
  })

  .post((req, res, next) => {
    const body = req.body;

    const tags = body.tags.map(tag =>
      Tag.findOrCreate({
        where: {
          title: tag
        },
        defaults: {
          title: tag
        }
      }).then(([tagInstance, created]) => tagInstance)
    );

    User.findAll({
        where: {
          id: body.userId
        }
      })
      .then(() => Post.create(body))
      .then(post =>
        Promise.all(tags)
        .then(storedTags => post.addTags(storedTags))
        .then(() => post)
      )
      .then(post =>
        Post.findOne({
          where: {
            id: post.id
          },
          include: [User, Tag, Category]
        })
      )
      .then(result => {
        res.json(result);
      })
      .catch(err => res.status(400).json(err.message));
  });


module.exports = router;