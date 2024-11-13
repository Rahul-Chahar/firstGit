// DOM elements
const addTodoButton = document.getElementById('addTodo');
const todoList = document.getElementById('todoList');
const expenseAmountInput = document.getElementById('expenseAmount');
const descriptionInput = document.getElementById('description');
const categorySelect = document.getElementById('category');

// Load todos from local storage
document.addEventListener('DOMContentLoaded', loadTodos);

addTodoButton.addEventListener('click', function() {
    // Get values from inputs
    const expenseAmount = expenseAmountInput.value;
    const description = descriptionInput.value;
    const category = categorySelect.value;

    if (expenseAmount && description) {
        // Create todo object
        const todo = {
            expenseAmount,
            description,
            category
        };

        // Save todo to local storage
        saveTodoToLocalStorage(todo);

        // Add todo to the list
        addTodoToList(todo);

        // Clear inputs
        expenseAmountInput.value = '';
        descriptionInput.value = '';
        categorySelect.value = 'Food';
    } else {
        alert('Please enter both expense amount and description');
    }
});

// Save todo to local storage
function saveTodoToLocalStorage(todo) {
    let todos = localStorage.getItem('todos');
    if (todos) {
        todos = JSON.parse(todos);
    } else {
        todos = [];
    }
    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

// Load todos from local storage
function loadTodos() {
    let todos = localStorage.getItem('todos');
    if (todos) {
        todos = JSON.parse(todos);
        todos.forEach(todo => addTodoToList(todo));
    }
}

// Add todo to the list
function addTodoToList(todo) {
    const li = document.createElement('li');
    li.className = 'list-group-item d-flex justify-content-between align-items-center';
    li.innerHTML = `
        ${todo.expenseAmount} - ${todo.description} (${todo.category})
        <button class="btn btn-warning btn-sm editBtn">Edit</button>
        <button class="btn btn-danger btn-sm deleteBtn">Delete</button>
    `;
    
    // Add event listener for Delete button
    li.querySelector('.deleteBtn').addEventListener('click', function() {
        li.remove();
        removeTodoFromLocalStorage(todo);
    });

    // Add event listener for Edit button
    li.querySelector('.editBtn').addEventListener('click', function() {
        expenseAmountInput.value = todo.expenseAmount;
        descriptionInput.value = todo.description;
        categorySelect.value = todo.category;
        li.remove();
        removeTodoFromLocalStorage(todo);
    });

    todoList.appendChild(li);
}

// Remove todo from local storage
function removeTodoFromLocalStorage(todo) {
    let todos = localStorage.getItem('todos');
    if (todos) {
        todos = JSON.parse(todos);
        todos = todos.filter(t => t.expenseAmount !== todo.expenseAmount || t.description !== todo.description || t.category !== todo.category);
        localStorage.setItem('todos', JSON.stringify(todos));
    }
}
