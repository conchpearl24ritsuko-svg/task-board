(function () {
  const STORAGE_KEY = 'task-board-tasks';

  function loadTasks() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
    } catch {
      return [];
    }
  }

  function saveTasks(tasks) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
  }

  function render(tasks) {
    const list = document.getElementById('taskList');
    list.innerHTML = '';

    tasks.forEach(function (task) {
      const li = document.createElement('li');
      li.className = 'task-item' + (task.done ? ' done' : '');

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = task.done;
      checkbox.addEventListener('change', function () {
        task.done = checkbox.checked;
        saveTasks(tasks);
        render(tasks);
      });

      const span = document.createElement('span');
      span.className = 'task-text';
      span.textContent = task.text;

      const deleteBtn = document.createElement('button');
      deleteBtn.className = 'delete-btn';
      deleteBtn.textContent = '✕';
      deleteBtn.addEventListener('click', function () {
        const index = tasks.indexOf(task);
        tasks.splice(index, 1);
        saveTasks(tasks);
        render(tasks);
      });

      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(deleteBtn);
      list.appendChild(li);
    });
  }

  function addTask(tasks, text) {
    const trimmed = text.trim();
    if (!trimmed) return;
    tasks.push({ text: trimmed, done: false });
    saveTasks(tasks);
    render(tasks);
  }

  function init() {
    const tasks = loadTasks();
    const input = document.getElementById('taskInput');
    const addBtn = document.getElementById('addBtn');

    addBtn.addEventListener('click', function () {
      addTask(tasks, input.value);
      input.value = '';
      input.focus();
    });

    input.addEventListener('keydown', function (e) {
      if (e.key === 'Enter') {
        addTask(tasks, input.value);
        input.value = '';
      }
    });

    render(tasks);
  }

  init();
})();
