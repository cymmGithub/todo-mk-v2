const { writeFile, readFile } = require('fs').promises;

const DB_PATH = 'db/dbArray.json';

const updateTodo = async (id) => {
  const readDB = JSON.parse(await readFile(DB_PATH, 'utf-8'));

  readDB.forEach((element) => {
    if (element.id === id && element.completed === true) {
      element.completed = false;
    } else if (element.id === id) {
      element.completed = true;
    }
  });

  await writeFile(DB_PATH, JSON.stringify(readDB), 'utf-8');
  return readDB;
};

module.exports = { updateTodo };
