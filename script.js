class Todo {
    constructor(title, description, dueDate, priority) {
        this.title = title; 
        this.description = description; 
        this.dueDate = dueDate; 
        this.priority = priority; 
    }
}

const  todoListArry = [] ;

function displayTodo(todo){
    const todoList = document.getElementById('todo-list')

    todoList.textContent = '';

    todoListArry.forEach(todo => {
    const todoItem = document.createElement('li');
    todoItem.classList.add('todo-item');

    const titleElement = document.createElement('h3');
    titleElement.textContent = todo.title;
    todoItem.appendChild(titleElement)

    const descriptionElement = document.createElement('p');
    descriptionElement.textContent = `Description: ${todo.description}`;
    todoItem.appendChild(descriptionElement);

    const duaDateElement = document.createElement('p');
    duaDateElement.textContent = `Due Date: ${todo.dueDate}`;
    todoItem.appendChild(duaDateElement);

    const priorityElement = document.createElement('p');
    priorityElement.textContent = `Priority: ${todo.priority}`;
    todoItem.appendChild(priorityElement);

     if (todo.priority === "High") {
            todoItem.classList.add("high-priority");
        } else if (todo.priority === "Medium") {
            todoItem.classList.add("medium-priority");
        } else if (todo.priority === "Low") {
            todoItem.classList.add("low-priority");
        }

    todoList.appendChild(todoItem);
    });
}

function addTodo(event){
    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('dueDate').value;
    const priority = document.getElementById('priority').value;

    const newTodo = new Todo(title, description, dueDate, priority);
    todoListArry.push(newTodo);

    document.getElementById("todo-form").reset();

    displayTodo();
}

document.getElementById("todo-form").addEventListener("submit", addTodo);

todoListArry.push(
    new Todo(
        "Learn JavaScript",
        "Complete the JavaScript section of my course",
        "2024-12-20",
        "High"
    )
)

todoListArry.push(
    new Todo(
        "Learn JavaScript 2",
        "Complete the JavaScript section of my course",
        "2024-12-20",
        "medium"
    )
)

todoListArry.push(
    new Todo(
        "Learn JavaScript 2",
        "Complete the JavaScript section of my course",
        "2024-12-20",
        "low"
    )
)

displayTodo();
