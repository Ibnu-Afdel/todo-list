// Define the Todo class
class Todo {
    constructor(title, description, dueDate, priority) {
        this.title = title; // The title of the task
        this.description = description; // A brief explanation
        this.dueDate = dueDate; // The deadline for the task
        this.priority = priority; // The priority level (e.g., 'high', 'medium', 'low')
    }
}


function displayTodo(todo){
    const todoList = document.getElementById('todo-list')

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

    todoList.appendChild(todoItem);
}

// Example of how we use this class:
const myFirstTodo = new Todo(
    "Learn JavaScript",
    "Complete the JavaScript section of my course",
    "2024-12-20",
    "High"
);

displayTodo(myFirstTodo);
