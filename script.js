class Todo {
    constructor(title, description, dueDate, priority) {
        this.title = title; 
        this.description = description; 
        this.dueDate = dueDate; 
        this.priority = priority; 
    }
}

const  todoListArry = [] ;

function displayTodo(){
    const todoList = document.getElementById('todo-list')

    todoList.textContent = '';

    todoListArry.forEach((todo, index) => {
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

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.classList.add('delete-button');
        deleteButton.addEventListener('click', () => deleteTodo(index));
        todoItem.appendChild(deleteButton);

        const editButton = document.createElement('button');
        editButton.textContent = 'Edit';
        editButton.classList.add('edit-button');
        editButton.addEventListener('click', () => openEditForm(index));
        todoItem.appendChild(editButton);

    todoList.appendChild(todoItem);
    });
}

function openEditForm(index){
    const todo = todoListArry[index];

    document.getElementById('title').value = todo.title;
    document.getElementById('description').value = todo.description;
    document.getElementById('dueDate').value = todo.dueDate;
    document.getElementById('priority').value = todo.priority;

    const form = document.getElementById('todo-form');
    form.dataset.editing = index;
}

function deleteTodo(index){
    todoListArry.splice(index,1);
    displayTodo();
}

function addTodo(event){
    event.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const dueDate = document.getElementById('dueDate').value;
    const priority = document.getElementById('priority').value;

    const editingIndex = document.getElementById('todo-form').dataset.editing;

    if (editingIndex !== undefined && editingIndex !== ''){
        const todo = todoListArry[editingIndex];
        todo.title = title;
        todo.description = description;
        todo.dueDate = dueDate;
        todo.priority = priority;


        document.getElementById('todo-form').dataset.editing = '';
    } else {
        const newTodo = new Todo(title, description, dueDate, priority);
        todoListArry.push(newTodo);
    }
    

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
        "Learn JavaScript 3",
        "Complete the JavaScript section of my course",
        "2024-12-20",
        "low"
    )
)

displayTodo();
