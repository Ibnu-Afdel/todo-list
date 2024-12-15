class Todo {
    constructor(title, description, dueDate, priority) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
    }
}

const projects = [
    {
        name: "Default",
        todos: [],
    },
];
let currentProjectIndex = 0;

function displayProjects() {
    const projectList = document.getElementById("project-list");
    projectList.textContent = "";

    projects.forEach((project, index) => {
        const projectItem = document.createElement("li");
        projectItem.textContent = project.name;
        projectItem.classList.add("project-item");

        if (index === currentProjectIndex) {
            projectItem.classList.add("active-project");
        }

        projectItem.addEventListener("click", () => selectProject(index));
        projectList.appendChild(projectItem);
    });
}

// Select a project
function selectProject(index) {
    currentProjectIndex = index;
    displayTodo();
    displayProjects();
}

// Save to localStorage
function saveToLocalStorage() {
    localStorage.setItem("todoAppData", JSON.stringify(projects));
}

// Load from localStorage
function loadFromLocalStorage() {
    const data = JSON.parse(localStorage.getItem("todoAppData"));

    if (Array.isArray(data)) {
        for (const project of data) {
            project.todos = project.todos.map(
                (todo) => new Todo(todo.title, todo.description, todo.dueDate, todo.priority)
            );
        }
        projects.splice(0, projects.length, ...data); // Update the global projects array
    } else {
        // If no data exists in localStorage, initialize with default data
        projects.splice(0, projects.length, {
            name: "Default",
            todos: [],
        });
    }
}


// Display the todos for the current project
function displayTodo() {
    const todoList = document.getElementById("todo-list");
    todoList.textContent = "";

    const currentProject = projects[currentProjectIndex];
    currentProject.todos.forEach((todo, index) => {
        const todoItem = document.createElement("li");
        todoItem.classList.add("todo-item");

        const titleElement = document.createElement("h3");
        titleElement.textContent = todo.title;
        todoItem.appendChild(titleElement);

        const descriptionElement = document.createElement("p");
        descriptionElement.textContent = `Description: ${todo.description}`;
        todoItem.appendChild(descriptionElement);

        const dueDateElement = document.createElement("p");
        dueDateElement.textContent = `Due Date: ${todo.dueDate}`;
        todoItem.appendChild(dueDateElement);

        const priorityElement = document.createElement("p");
        priorityElement.textContent = `Priority: ${todo.priority}`;
        todoItem.appendChild(priorityElement);

        if (todo.priority === "High") {
            todoItem.classList.add("high-priority");
        } else if (todo.priority === "Medium") {
            todoItem.classList.add("medium-priority");
        } else if (todo.priority === "Low") {
            todoItem.classList.add("low-priority");
        }

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.classList.add("delete-button");
        deleteButton.addEventListener("click", () => deleteTodo(index));
        todoItem.appendChild(deleteButton);

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.classList.add("edit-button");
        editButton.addEventListener("click", () => openEditForm(index));
        todoItem.appendChild(editButton);

        todoList.appendChild(todoItem);
    });
}

// Open the edit form
function openEditForm(index) {
    const currentProject = projects[currentProjectIndex];
    const todo = currentProject.todos[index];

    document.getElementById("title").value = todo.title;
    document.getElementById("description").value = todo.description;
    document.getElementById("dueDate").value = todo.dueDate;
    document.getElementById("priority").value = todo.priority;

    const form = document.getElementById("todo-form");
    form.dataset.editing = index;
}

// Delete a todo
function deleteTodo(index) {
    const currentProject = projects[currentProjectIndex];
    currentProject.todos.splice(index, 1);
    displayTodo();
    saveToLocalStorage();
}

// Add or edit a todo
function addTodo(event) {
    event.preventDefault();

    const title = document.getElementById("title").value;
    const description = document.getElementById("description").value;
    const dueDate = document.getElementById("dueDate").value;
    const priority = document.getElementById("priority").value;

    const editingIndex = document.getElementById("todo-form").dataset.editing;
    const currentProject = projects[currentProjectIndex];

    if (editingIndex) {
        const todo = currentProject.todos[editingIndex];
        todo.title = title;
        todo.description = description;
        todo.dueDate = dueDate;
        todo.priority = priority;

        document.getElementById("todo-form").dataset.editing = "";
    } else {
        const newTodo = new Todo(title, description, dueDate, priority);
        currentProject.todos.push(newTodo);
    }

    document.getElementById("todo-form").reset();
    displayTodo();
    saveToLocalStorage();
}

// Add a new project
function addProject() {
    const projectName = prompt("Enter the name of the new project:");
    if (projectName) {
        projects.push({
            name: projectName,
            todos: [],
        });
        displayProjects();
        saveToLocalStorage();
    }
}

// Initialize the app
function initializeApp() {
    loadFromLocalStorage();
    displayProjects();
    displayTodo();
}

initializeApp();

document.getElementById("todo-form").addEventListener("submit", addTodo);
document.getElementById("add-project").addEventListener("click", addProject);
