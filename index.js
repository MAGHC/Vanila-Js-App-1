const clockHtml = document.querySelector(".watch");
const body = document.querySelector("body");

//로그인
const loginForm = document.querySelector(".idpwForm");
const loginBtn = document.querySelector(".loginBtn");
const afterLogin = document.querySelector(".none");
const nameSetHtml = document.querySelector(".nameSet");
const userName = document.querySelector(".userNmae");

const toDoList = document.querySelector(".todoList");

const userInputTodo = document.querySelector(".userTodoInput");
const toDoAllDeleteBtn = document.querySelector(".toDoAllDelete");

const allReset = document.querySelector(".allReset");

const grabToDoList = document.querySelector(".grabToDoList");

const todoForm = document.querySelector(".todoForm");

const selectTodo = document.querySelector(".selectToDoDelete");

const MemoLength = document.querySelector(".sum");

const searchResult = document.querySelector(".result");

//검색

const search = document.querySelector(".search");
const userSearch = document.querySelector(".userSearch");

setInterval(() => {
  clockHtml.innerHTML = new Date();
}, 1000);

function handleAllReset(event) {
  event.preventDefault();
  localStorage.clear();
  location.reload();
}

function saveInfo(event) {
  event.preventDefault();
  const idInput = document.querySelector(".idInput");

  const idValue = idInput.value;

  localStorage.setItem("id", idValue);

  loginForm.classList = "none";
  afterLogin.classList = "";
  userName.innerHTML = localStorage.getItem("id");
}

let todos = [];

function saveTodo() {
  localStorage.setItem("todos", JSON.stringify(todos));
}

function handleNameSetBtn(event) {
  event.preventDefault();
  loginForm.classList = "idpwForm";
  afterLogin.classList = "none";
  localStorage.removeItem("id");
}

function handleSubmit(event) {
  event.preventDefault();

  if (userInputTodo.value === "") {
    alert("입력창이 비어있습니다");
  } else {
    let newToDo = userInputTodo.value;

    userInputTodo.value = "";
    const newToDoObj = {
      id: Date.now(),
      text: newToDo,
      checked: false,
    };
    addTodo(newToDoObj);
    todos.push(newToDoObj);
    saveTodo();
  }
}

function deleteTodo(event) {
  const li = event.target.parentElement.parentElement;
  todos = todos.filter((item) => item.id !== parseInt(li.id));
  li.remove();
  saveTodo();
}

function addTodo(newToDo) {
  const li = document.createElement("li");
  const span = document.createElement("span");
  const button = document.createElement("button");
  const input = document.createElement("input");

  button.addEventListener("click", deleteTodo);

  input.type = "checkbox";
  input.checked = newToDo.checked;

  li.appendChild(input);
  li.appendChild(span);
  li.id = newToDo.id;
  span.innerText = newToDo.text;
  button.className = "xButton";
  span.appendChild(button);
  button.innerHTML = "x";
  grabToDoList.appendChild(li);
  input.checked === true ? (span.className = "success") : (span.className = "");

  input.addEventListener("click", () => {
    input.checked === true ? (span.className = "success") : (span.className = "");
    newToDo.checked = input.checked;
    saveTodo();
  });
}

const getToDos = localStorage.getItem("todos");

if (getToDos !== null) {
  const parsedToDos = JSON.parse(getToDos);
  todos = parsedToDos;
  parsedToDos.forEach((item) => addTodo(item));
}

const getName = localStorage.getItem("id");

if (getName !== null) {
  loginForm.classList = "none";
  afterLogin.classList = "";
  userName.innerHTML = localStorage.getItem("id");
}

function allDeleteToDo() {
  localStorage.removeItem("todos");
  let listChildren = grabToDoList.children;
  for (let i = 0; i < listChildren.length; i++) {
    listChildren[i].remove(listChildren[i]);
    i--;
    // i-- 를 해줘야 계속 갱신되는 length 값에 영향을 받지 않고 마지막까지 for를 돌리게됨
  }
  todos = [];
  saveTodo(); // todos 를 초기화 해서 저장하지 않는다면 다시 요소들을 추가했을시에 지웠던 todos의 값을 참조해서 살아나는것을 확인 지웠다고 해도 init을 해줘야되는 이유 가 이거구나
}

function selectToDoDelete() {
  const selectBox = document.querySelectorAll(".grabToDoList input");
  selectBox.forEach((item) => {
    if (item.checked === true) {
      const li = item.parentElement;
      li.remove();
      todos = todos.filter((list) => list.id !== parseInt(li.id));
      saveTodo();
    }
  });
}

setInterval(() => {
  let count = 0;
  todos.forEach((item) => (item.checked === true ? count++ : ""));
  if (todos.length !== 0) {
    MemoLength.innerHTML = `총 메모 ${todos.length}개 완료 ${count}개`;
  } else {
    MemoLength.innerHTML = "";
  }
}, 100);

function searchItem(e) {
  e.preventDefault();
  const SearchValue = userSearch.value;
  console.log(SearchValue);
  const result = JSON.stringify(
    todos.filter(function (item) {
      if (item.text === SearchValue) {
        return item;
      }
    })
  );
  searchResult.innerHTML = result;
}

loginForm.addEventListener("submit", saveInfo);

todoForm.addEventListener("submit", handleSubmit);

nameSetHtml.addEventListener("click", handleNameSetBtn);

toDoAllDeleteBtn.addEventListener("click", allDeleteToDo);

allReset.addEventListener("click", handleAllReset);

todoForm.addEventListener("click", () => {
  userInputTodo.value = "";
});

selectTodo.addEventListener("click", selectToDoDelete);

search.addEventListener("click", searchItem);

// setInterval 값 수정  / obj에 날짜 추가할생각인데 여기서부터 obj에 이거저거 넣고 저장하고 하는건 이미 다아는데 추가하는게 의미가있나싶기도하고
