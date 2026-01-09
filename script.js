const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addBtn');
const taskList = document.getElementById('taskList');
const taskCount = document.getElementById('taskCount');
const dateDisplay = document.getElementById('dateDisplay');

// Initialize State
let tasks = JSON.parse(localStorage.getItem('premiumTasks')) || [];

// Set Date
const options = { weekday: 'long', month: 'short', day: 'numeric' };
dateDisplay.innerText = new Date().toLocaleDateString(undefined, options);

function saveAndRender() {
    localStorage.setItem('premiumTasks', JSON.stringify(tasks));
    renderTasks();
}

function renderTasks() {
    taskList.innerHTML = '';
    let pendingCount = 0;

    tasks.forEach((task, index) => {
        if (!task.completed) pendingCount++;

        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        
        li.innerHTML = `
            <div class="task-text" onclick="toggleTask(${index})">
                ${task.text}
            </div>
            <div class="actions">
                <button class="btn-icon complete-btn" onclick="toggleTask(${index})">
                    ${task.completed ? '↺' : '✓'}
                </button>
                <button class="btn-icon delete-btn" onclick="deleteTask(${index})">✕</button>
            </div>
        `;
        taskList.appendChild(li);
    });

    taskCount.innerText = `${pendingCount} tasks remaining`;
}

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
});

function addTask() {
    const text = taskInput.value.trim();
    if (text !== "") {
        tasks.unshift({ text: text, completed: false }); // Add to top
        taskInput.value = '';
        saveAndRender();
    }
}

function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    saveAndRender();
}

function deleteTask(index) {
    tasks.splice(index, 1);
    saveAndRender();
}

// Initial Run
renderTasks();