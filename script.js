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

function selectProject(index) {
    currentProjectIndex = index;
    displayTodo();
    displayProjects();
}

function saveToLocalStorage() {
    localStorage.setItem("todoAppData", JSON.stringify(projects));
}

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


function displayTodo() {
    const todoList = document.getElementById("todo-list");
    todoList.textContent = "";

    const currentProject = projects[currentProjectIndex];
    currentProject.todos.forEach((todo, index) => {
        const todoItem = document.createElement("li");
        todoItem.classList.add("todo-item");

        const titleElement = document.createElement("h3");
        titleElement.textContent = todo.title;
        titleElement.classList.add('clickable');
        titleElement.addEventListener('click', () => openExpandedView(index));
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

function openExpandedView(index) {
    const currentProject = projects[currentProjectIndex];
    const todo = currentProject.todos[index];
  
    const expandedView = document.getElementById("expanded-view");
    expandedView.classList.remove("hidden");
    expandedView.textContent = ""; 
  
    const titleElement = document.createElement("h2");
    titleElement.textContent = todo.title;
    expandedView.appendChild(titleElement);
  
    const descriptionElement = document.createElement("p");
    const descriptionLabel = document.createElement("strong");
    descriptionLabel.textContent = "Description: ";
    descriptionElement.appendChild(descriptionLabel);
    descriptionElement.appendChild(document.createTextNode(todo.description));
    expandedView.appendChild(descriptionElement);
  
    const dueDateElement = document.createElement("p");
    const dueDateLabel = document.createElement("strong");
    dueDateLabel.textContent = "Due Date: ";
    dueDateElement.appendChild(dueDateLabel);
    dueDateElement.appendChild(document.createTextNode(todo.dueDate));
    expandedView.appendChild(dueDateElement);
  
    const priorityElement = document.createElement("p");
    const priorityLabel = document.createElement("strong");
    priorityLabel.textContent = "Priority: ";
    priorityElement.appendChild(priorityLabel);
    priorityElement.appendChild(document.createTextNode(todo.priority));
    expandedView.appendChild(priorityElement);
  
      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.id = "edit-todo";
      editButton.addEventListener("click", () => {
          openEditForm(index);
          expandedView.classList.add("hidden");
      });
      expandedView.appendChild(editButton);
  
      const closeButton = document.createElement("button");
      closeButton.textContent = "Close";
      closeButton.id = "close-expanded";
      closeButton.addEventListener("click", () => {
          expandedView.classList.add("hidden");
          localStorage.removeItem('expandedTodoIndex');
      });
      expandedView.appendChild(closeButton);

      localStorage.setItem('expandedTodoIndex', JSON.stringify({
        project: currentProjectIndex,
        todo:index
      }));
  }

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

function deleteTodo(index) {
    const currentProject = projects[currentProjectIndex];
    currentProject.todos.splice(index, 1);
    displayTodo();
    saveToLocalStorage();
}

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

function initializeApp() {
    loadFromLocalStorage();
    displayProjects();
    displayTodo();

    const expandedTodoData = JSON.parse(localStorage.getItem("expandedTodoIndex"));
    if (expandedTodoData) {
        const { project, todo } = expandedTodoData;
        if (projects[project] && projects[project].todos[todo]) {
            currentProjectIndex = project;
            displayProjects();
            openExpandedView(todo);
        }
    }
}

function initializeSearch() {
    const searchBar = document.getElementById("search-bar");
    searchBar.addEventListener("input", () => {
        const query = searchBar.value.toLowerCase().trim();
        searchTodos(query);
    });
}

function searchTodos(query) {
    const todoList = document.getElementById("todo-list");
    todoList.textContent = "";

    const currentProject = projects[currentProjectIndex];
    const filteredTodos = currentProject.todos.filter(todo =>
        todo.title.toLowerCase().includes(query) ||
        todo.description.toLowerCase().includes(query) ||
        todo.dueDate.toLowerCase().includes(query) ||
        todo.priority.toLowerCase().includes(query)
    );

    filteredTodos.forEach((todo, index) => {
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

initializeSearch();

// Function to sort todos by priority or due date
function sortTodos() {
    const sortMethod = document.getElementById("sort-todos").value;
    const currentProject = projects[currentProjectIndex];

    if (sortMethod === "priority") {
        currentProject.todos.sort((a, b) => {
            const priorityOrder = { High: 1, Medium: 2, Low: 3 };
            return priorityOrder[a.priority] - priorityOrder[b.priority];
        });
    } else if (sortMethod === "dueDate") {
        currentProject.todos.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
    }

    displayTodo();
}

// Attach the sort function to the dropdown
document.getElementById("sort-todos").addEventListener("change", sortTodos);



initializeApp();

document.getElementById("todo-form").addEventListener("submit", addTodo);
document.getElementById("add-project").addEventListener("click", addProject);
