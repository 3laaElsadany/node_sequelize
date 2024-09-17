const {
  DataTypes
} = require('sequelize');
const db = require('../config/db');

const CategoryModel = require('./Category');
const UserModel = require('./User');
const PostModel = require('./Post');
const TagModel = require('./Tag');

const Category = CategoryModel(db, DataTypes);
const User = UserModel(db, DataTypes);
const Post = PostModel(db, DataTypes);
const Tag = TagModel(db, DataTypes);
const PostTag = db.define("post_tag");

Category.hasMany(Post, {
  as: "articles"
})
Post.belongsTo(Category);

User.hasMany(Post);
Post.belongsTo(User);

Post.belongsToMany(Tag, {
  through: PostTag
});
Tag.belongsToMany(Post, {
  through: PostTag
});


db.sync({
    force: false
  })
  .then(() => {
    console.log('Tables Created')
  })
  .catch(err => {
    console.log(err.message)
  })

module.exports = {
  Category,
  User,
  Post,
  Tag
}