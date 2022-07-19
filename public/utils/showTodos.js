const showTodos = (parsedData) => {
  tdList.innerText = '';
  parsedData.forEach((todo) => {
    const tdItem = document.createElement('div');
    tdItem.classList.add('todo-item');

    const label = document.createElement('label');
    const span = document.createElement('span');
    const content = document.createElement('div');
    const actions = document.createElement('div');
    const input = document.createElement('input');

    input.type = 'checkbox';
    input.id = `${todo.id}`;

    span.classList.add('bubble');
    if (todo.priority === 'high') {
      span.classList.add('high');
    } else {
      span.classList.add('low');
    }

    content.classList.add('todo-content');
    actions.classList.add('actions');

    actions.innerHTML = `<button class="delete" name="deleteBtn" id="${todo.id}" "onclick="location.href='http://localhost:3000/todo/delete'" type="button">
      Delete</button>`;

    content.innerText = `${todo.taskContent}`;
    label.appendChild(input);
    label.appendChild(span);
    tdItem.appendChild(label);
    tdItem.appendChild(content);
    tdItem.appendChild(actions);
    tdList.appendChild(tdItem);

    if (todo.completed) {
      tdItem.classList.add('done');
      input.checked = 'checked';
    } else {
      tdItem.classList.add('doing');
      tdItem.classList.remove('done');
    }
  });
};
