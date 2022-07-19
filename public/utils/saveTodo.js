const { writeFile, readFile } = require('fs').promises;

const DB_PATH = 'db/dbArray.json';

const saveTodo = async (data) => {
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

  return parsedData;
};

module.exports = { saveTodo };
