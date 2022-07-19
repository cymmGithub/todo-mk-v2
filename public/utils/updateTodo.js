const updateTodoDB = async (method, id) => {
  const response = await fetch(`http://localhost:3000/todo/${method}/${id}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
    },

  });
  const readDB = await response.json();
  showTodos(readDB);
};
