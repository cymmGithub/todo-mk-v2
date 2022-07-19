/* eslint-disable no-undef */
const form = document.querySelector('#new-todo-form');
const tdList = document.querySelector('#todo-list');
const h4 = document.querySelector('h4');
const options = document.querySelector('.options');
const content = document.querySelector('#content');

window.addEventListener('load', async () => {
  const response = await fetch('http://localhost:3000/todo/HOME');

  const readDB = await response.json();
  if (!readDB.length) {
    return;
  }

  showTodos(readDB);
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const input = e.target.elements.content;
  const priority = e.target.elements.category.value;
  // Toggle animation if priority is not selected or input is empty
  if (input.value.trim() === '') {
    return input.classList.add('flipX');
  }
  if (priority === '') {
    return h4.classList.add('flipX');
  }

  const todo = {
    taskContent: input.value,
    priority,

  };

  const response = await fetch('http://localhost:3000/todo/ADD', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(todo),
  });
  const readDB = await response.json();

  showTodos(readDB);
  input.value = '';
});

tdList.addEventListener('click', async (e) => {
  if (e.target.name === 'deleteBtn') {
    updateTodoDB('DELETE', e.target.id);
  }
});

tdList.addEventListener('click', async (e) => {
  // e.target.checked ? updateTodoDB('PUT', e.target.id) : updateTodoDB('PUT', e.target.id);
  if (e.target.checked) {
    updateTodoDB('PUT', e.target.id);
  } else if (e.target.checked === false) {
    updateTodoDB('PUT', e.target.id);
  }
});

// Remove animation listener
options.addEventListener('click', () => {
  h4.classList.remove('flipX');
});

content.addEventListener('click', () => {
  content.classList.remove('flipX');
});
