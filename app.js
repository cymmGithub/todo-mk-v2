const express = require('express');
const { todoRouter } = require('./routes/todo');

const app = express();

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(express.static('public'));
app.use(express.json());
app.use('/todo', todoRouter);

app.listen(
  process.env.PORT || 3000,
  () => console.log('Server is running...'),
);
