const express = require('express');

const { writeFile, readFile } = require('fs').promises;

const todoRouter = express.Router();
const DB_PATH = 'db/dbArray.json';

todoRouter

  .get('/HOME', async (req, res) => {
    try {
      const readedDB = await readFile(DB_PATH, 'utf-8');

      res.json(JSON.parse(readedDB));
    } catch (e) {
      if (e.code === 'ENOENT') {
        res.json([]);
      }
    }
  })
  .post('/ADD', async (req, res) => {
    const data = req.body;

    const todo = {

      id: new Date().valueOf(),
      completed: false,
      taskContent: data.taskContent,
      priority: data.priority,
    };

    let readDB = await readFile(DB_PATH, 'utf-8');
    if (readDB === '') {
      readDB = [];
      readDB.push(todo);
      await writeFile(DB_PATH, JSON.stringify(readDB), 'utf8');
    }
    const parsedData = JSON.parse(readDB);

    parsedData.push(todo);
    await writeFile(DB_PATH, JSON.stringify(parsedData), 'utf8');

    res.json(parsedData);
  })
  .delete('/DELETE/:id', async (req, res) => {
    const readDB = JSON.parse(await readFile(DB_PATH, 'utf-8'));

    const todoID = JSON.parse(req.params.id);
    console.log(todoID);
    readDB.splice(todoID, 1);
    readDB.forEach((element, i) => {
      if (element.id === todoID) {
        readDB.splice(i, 1);
      }
    });

    await writeFile(DB_PATH, JSON.stringify(readDB), 'utf8');
    res.json(readDB);
  })
  .put('/PUT/:id', async (req, res) => {
    const readDB = JSON.parse(await readFile(DB_PATH, 'utf-8'));
    const todoID = JSON.parse(req.params.id);
    console.log(todoID);

    readDB.forEach((element) => {
      if (element.id === todoID && element.completed === true) {
        element.completed = false;
      } else if (element.id === todoID) {
        element.completed = true;
      }
    });

    await writeFile(DB_PATH, JSON.stringify(readDB), {
      encoding: 'utf-8',
    });

    res.json(readDB);
  });

module.exports = { todoRouter };
