// Yeh function todos ko local storage se load karta hai
function loadTodos() {
    const todos = JSON.parse(localStorage.getItem("todos")) || { "todoList": [] };
    console.log(todos);
    return todos;
}

// Yeh function new todo ko local storage mein save karta hai
function addTodoToLocalStorage(todo) {
    const todos = loadTodos();
    todos.todoList.push({ ...todo });
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Yeh function local storage mein existing todo ko update karta hai
function updateTodoInLocalStorage(updatedTodo) {
    const todos = loadTodos();
    todos.todoList = todos.todoList.map(todo =>
        todo.id === updatedTodo.id ? updatedTodo : todo
    );
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Yeh function filter buttons ke hisaab se todos ko filter karta hai
function executeFilterAction(event) {
    const todoList = document.getElementById("todoList");
    const element = event.target;
    const value = element.getAttribute("data-filter");
    todoList.innerHTML = '';
    const todos = loadTodos();

    if (value === "all") {
        todos.todoList.forEach(todo => {
            appendTodoInHtml(todo);
        });
    } else if (value === "pending") {
        todos.todoList.forEach(todo => {
            if (!todo.isCompleted) {
                appendTodoInHtml(todo);
            }
        });
    } else if (value === "completed") {
        todos.todoList.forEach(todo => {
            if (todo.isCompleted) {
                appendTodoInHtml(todo);
            }
        });
    }
}

// Yeh function todo ko HTML mein list mein add karta hai
function appendTodoInHtml(todo) {
    const todoList = document.getElementById("todoList");

    const todoItem = document.createElement("li");

    const textDiv = document.createElement("div");
    textDiv.textContent = todo.text;
    todoItem.classList.add("todoItem");

    const wrapper = document.createElement("div");
    wrapper.classList.add("todoButtons");

    const editBtn = document.createElement("button");
    editBtn.textContent = "Edit";
    editBtn.classList.add("editBtn");

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.classList.add("deleteBtn");

    const completedBtn = document.createElement("button");
    completedBtn.textContent = todo.isCompleted ? "Undo" : "Complete";
    completedBtn.classList.add("completedBtn");

    // Edit button ke liye click event
    editBtn.addEventListener("click", () => {
        editTodo(todo, textDiv);
    });

    // Delete button ke click event
    deleteBtn.addEventListener("click", () => {
        removeTodoFromLocalStorage(todo.id);
        todoItem.remove();
    });

    // Completed button ke click event
    completedBtn.addEventListener("click", () => {
        toggleTodoCompletion(todo, completedBtn, textDiv);
    });

    wrapper.appendChild(editBtn);
    wrapper.appendChild(deleteBtn);
    wrapper.appendChild(completedBtn);

    todoItem.appendChild(textDiv);
    todoItem.appendChild(wrapper);
    todoList.appendChild(todoItem);

    // Check if the todo is completed and apply styles accordingly
    if (todo.isCompleted) {
        todoItem.classList.add("completed");
        textDiv.style.textDecoration = "line-through";
    }
}

// Edit todo functionality
function editTodo(todo, textDiv) {
    const newText = prompt("Edit your todo:", todo.text);
    if (newText !== null && newText.trim() !== '') {
        todo.text = newText.trim();
        textDiv.textContent = todo.text;
        updateTodoInLocalStorage(todo);
    }
}

// Local storage se todo ko remove karna
function removeTodoFromLocalStorage(id) {
    const todos = loadTodos();
    todos.todoList = todos.todoList.filter(todo => todo.id !== id);
    localStorage.setItem("todos", JSON.stringify(todos));
}

// Todo ko completed mark karna ya undo karna
function toggleTodoCompletion(todo, completedBtn, textDiv) {
    todo.isCompleted = !todo.isCompleted;
    completedBtn.textContent = todo.isCompleted ? "Undo" : "Complete";
    updateTodoInLocalStorage(todo);

    if (todo.isCompleted) {
        textDiv.style.textDecoration = "line-through";
    } else {
        textDiv.style.textDecoration = "none";
    }
}

// Document load hone par yeh function chalega
document.addEventListener("DOMContentLoaded", () => {
    const todoInput = document.getElementById("todoInput");
    const submitButton = document.getElementById("addTodo");

    // Pehle se save todos ko display karna
    const todos = loadTodos();
    todos.todoList.forEach(todo => {
        appendTodoInHtml(todo);
    });

    // Add Todo button ke click event pe yeh function chalega
    submitButton.addEventListener("click", () => {
        addTodo(todoInput);
    });

    // Enter key press karne par bhi todo add ho
    todoInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") {
            addTodo(todoInput);
        }
    });

    // Filter buttons ke liye event listeners add karna
    const filterBtns = document.querySelectorAll(".filterBtn");
    filterBtns.forEach(btn => {
        btn.addEventListener("click", executeFilterAction);
    });
});

// Yeh function todo add karta hai
function addTodo(todoInput) {
    const todoText = todoInput.value;
    if (todoText === '') {
        alert("Please write something for the todo");
    } else {
        const todos = loadTodos();
        const id = todos.todoList.length + 1;
        const todo = { "text": todoText, "isCompleted": false, "id": id };
        addTodoToLocalStorage(todo);
        appendTodoInHtml(todo);
        todoInput.value = '';
    }
}
