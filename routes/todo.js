const express = require('express');
const { readFile } = require('fs').promises;
const { saveTodo } = require('../public/utils/saveTodo');
const { deleteTodo } = require('../public/utils/deleteTodo');
const { updateTodo } = require('../public/utils/updateTodo');

const todoRouter = express.Router();

const DB_PATH = 'db/dbArray.json';

todoRouter

  .get('/', async (req, res) => {
    try {
      const readedDB = await readFile(DB_PATH, 'utf-8');

      res.json(JSON.parse(readedDB));
    } catch (e) {
      if (e.code === 'ENOENT') {
        res.json([]);
      }
    }
  })
  .post('/', async (req, res) => {
    const data = req.body;
    const parsedData = await saveTodo(data);

    res.json(parsedData);
  })
  .delete('/delete/:id', async (req, res) => {
    const todoID = JSON.parse(req.params.id);
    const parsedDB = await deleteTodo(todoID);
    res.json(parsedDB);
  })
  .put('/put/:id', async (req, res) => {
    const todoID = JSON.parse(req.params.id);
    const parsedDB = await updateTodo(todoID);

    res.json(parsedDB);
  });

module.exports = { todoRouter };
