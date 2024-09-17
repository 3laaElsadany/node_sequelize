const express = require('express');
const app = express();
require('dotenv').config();
const db = require('./config/db');
const postRouter = require('./routes/posts');
const tagRouter = require('./routes/tags');
const userRouter = require('./routes/users');
const categoryRouter = require('./routes/categories');

db.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });

app.use(express.urlencoded({
  extended: true
}));
app.use(express.json());

app.use('/api/posts', postRouter);
app.use('/api/tags', tagRouter);
app.use('/api/users', userRouter);
app.use('/api/categories', categoryRouter);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})