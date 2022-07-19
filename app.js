const express = require('express');
const { todoRouter } = require('./routes/todo');

const app = express();

app.use(express.static('public'));
app.use(express.json());
app.use('/todo', todoRouter);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`listening on ${PORT}`));
