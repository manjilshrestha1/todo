let tasksArray = [];
let editIndex = null;

window.onload = function () {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
        tasksArray = JSON.parse(storedTasks);
        updateTasks();
    }
};

function openAddModal() {
    document.querySelector(".intro-container").style.display = "none";
    document.getElementById("addModal").style.display = "flex";
    editIndex = null;
    document.getElementById("addModalTitle").innerText = "Add Task";
    document.getElementById("newTask").value = "";
    document.getElementById("newDescription").value = "";
}

function closeAddModal() {
    document.querySelector(".intro-container").style.display = "block";
    document.getElementById("addModal").style.display = "none";
    document.getElementById("newTask").value = "";
    document.getElementById("newDescription").value = "";
}

function openEditModal(index) {
    document.querySelector(".intro-container").style.display = "none";
    editIndex = index;
    document.getElementById("editTask").value = tasksArray[index].task;
    document.getElementById("editDescription").value = tasksArray[index].description;
    document.getElementById("editModal").style.display = "flex";
}

function closeEditModal() {
    document.querySelector(".intro-container").style.display = "block";
    document.getElementById("editModal").style.display = "none";
    document.getElementById("editTask").value = "";
    document.getElementById("editDescription").value = "";
}

function updateTaskContent(index) {
    const introContainer = document.querySelector(".intro-container");

    if (tasksArray.length > 0) {
        const task = tasksArray[index];

        const table = document.createElement("table");
        table.innerHTML = `
        <h3>Tasklist</h3>
            <tr>
                <th>Task</th>
                <th>Description</th>
                <th>Actions</th>
            </tr>
            <tr>
                <td>${task.task}</td>
                <td>${task.description}</td>
                <td>
                    <button onclick="openEditModal(${index})"><i class="fa-solid fa-pen-to-square"></i></button>
                    <button onclick="deleteTask(${index})"><i class="fa-solid fa-trash"></i></button>
                </td>
            </tr>
        `;

        introContainer.innerHTML = "";
        introContainer.appendChild(table);
    } else {
        introContainer.style.display = "block";
        introContainer.innerHTML = `
            <h1>Organize your work and life, finally.</h1>
            <p>Become focused, organized, and calm with our TaskManager. The world’s #1 task manager.</p>
        `;
    }

    updateTasks();
}


function addTask() {
    const newTask = document.getElementById("newTask").value;
    const newDescription = document.getElementById("newDescription").value;
    if (newTask.trim() !== "") {
        if (editIndex !== null) {
            tasksArray[editIndex] = { task: newTask, description: newDescription };
            editIndex = null;
        } else {
            tasksArray.push({ task: newTask, description: newDescription });
        }
        localStorage.setItem('tasks', JSON.stringify(tasksArray));
        location.reload();
    }
}

function updateTask() {
    const editedTask = document.getElementById("editTask").value;
    const editedDescription = document.getElementById("editDescription").value;
    if (editedTask.trim() !== "") {
        tasksArray[editIndex] = { task: editedTask, description: editedDescription };
        updateTaskContent(editIndex);
        closeEditModal();
    }
}

function deleteTask(index) {
    const confirmation = confirm("Are you sure you want to delete this task?");
    if (confirmation) {
        tasksArray.splice(index, 1);
        localStorage.setItem('tasks', JSON.stringify(tasksArray));
        location.reload(); 
    }
}

function updateTasks() {
    const tasksContainer = document.getElementById("tasks");
    tasksContainer.innerHTML = "";
    localStorage.setItem('tasks', JSON.stringify(tasksArray));

    tasksArray.forEach((task, index) => {
        const taskElement = document.createElement("div");
        taskElement.className = "task";
        taskElement.innerHTML = `
            <span>${task.task}</span>
        `;
        taskElement.onclick = function () {
            updateTaskContent(index);
        };

        tasksContainer.appendChild(taskElement);
    });
}