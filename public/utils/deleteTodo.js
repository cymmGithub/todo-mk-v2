const { writeFile, readFile } = require('fs').promises;

const DB_PATH = 'db/dbArray.json';

const deleteTodo = async (id) => {
  const readDB = JSON.parse(await readFile(DB_PATH, 'utf-8'));

  readDB.splice(id, 1);
  readDB.forEach((element, i) => {
    if (element.id === id) {
      readDB.splice(i, 1);
    }
  });

  await writeFile(DB_PATH, JSON.stringify(readDB), 'utf8');
  return readDB;
};

module.exports = { deleteTodo };
