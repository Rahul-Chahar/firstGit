const getBtn = document.getElementById("get-btn");
const postBtn = document.getElementById("post-btn");
const putBtn = document.getElementById("put-btn");
const deleteBtn = document.getElementById("delete-btn");

getBtn.addEventListener("click", getTodos);
postBtn.addEventListener("click", postTodo);
putBtn.addEventListener("click", putTodo);
deleteBtn.addEventListener("click", deleteTodo);

function getTodos() {
  // Write your code here
  axios.get("https://crudcrud.com/api/87cb55881db946b7876b052739469a55/todo")
    .then((resolve) => console.log(resolve))
    .catch((error) => console.log(error));
}

function postTodo() {
  // Write your code here
  axios.post("https://crudcrud.com/api/87cb55881db946b7876b052739469a55/todo", {
    title: "Learn JavaScript",
    completed: false,
  })
    .then((resolve) => console.log(resolve))
    .catch((error) => console.log(error));
}

function putTodo() {
  // Write your code here
  axios.put("https://crudcrud.com/api/87cb55881db946b7876b052739469a55/todo/6733439d3af7c503e8d5d8e7", {
    title: "Learn Axios",
    completed: true,
  })
    .then((resolve) => console.log(resolve))
    .catch((error) => console.log(error));
}

function deleteTodo() {
  // Write your code here
  axios.delete("https://crudcrud.com/api/87cb55881db946b7876b052739469a55/todo/6733439d3af7c503e8d5d8e7")
    .then((resolve) => console.log(resolve))
    .catch((error) => console.log(error));
}
