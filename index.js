
const clockHtml = document.querySelector('.watch')
const body = document.querySelector('body')

//로그인
const loginForm = document.querySelector('.idpwForm')
const loginBtn = document.querySelector('.loginBtn')
const afterLogin = document.querySelector('.none')
const nameSetHtml = document.querySelector('.nameSet')


const userName = document.querySelector('.userNmae')
const toDoList = document.querySelector('.todoList')
const userInputTodo = document.querySelector('.userTodoInput')
const toDoAllDeleteBtn = document.querySelector('.toDoAllDelete')


const todoForm = document.querySelector('.todoForm')

setInterval(()=>{clockHtml.innerHTML = new Date()},1000)




function saveInfo(event)
{ event.preventDefault();
    const idInput = document.querySelector('.idInput')
    const pwInput = document.querySelector('.pwInput')
    const idValue = idInput.value
    const pwValue = pwInput.value
    localStorage.setItem('id', idValue )
    localStorage.setItem('pw', pwValue)
    loginForm.classList ='none'
    afterLogin.classList =''
    userName.innerHTML = localStorage.getItem('id')    
    
}

let todos =[]

function saveTodo(){
    localStorage.setItem('todos',JSON.stringify(todos))
}

function handleNameSetBtn(event){
    event.preventDefault()
    loginForm.classList ='idpwForm'
    afterLogin.classList ='none'
    localStorage.removeItem('id')
    localStorage.removeItem('pw')

}

function handleSubmit(event){
    event.preventDefault()
    let newToDo = userInputTodo.value
    addTodo(newToDo)
    userInputTodo.value = ''
    todos.push(newToDo)
    saveTodo()

}


function deleteTodo(event){
 const li = event.target.parentElement.parentElement
 li.remove()
}

function addTodo(newToDo){
    const li = document.createElement('li')
    const span =document.createElement('span')
    const button = document.createElement('button')

    button.addEventListener("click", deleteTodo )

    li.appendChild(span)
    span.innerText = newToDo
    span.appendChild(button)
    button.innerHTML="x"
    toDoList.appendChild(li)
}


const getToDos = localStorage.getItem("todos");

if (getToDos !== null) {
  const parsedToDos = JSON.parse(getToDos);
  todos = parsedToDos
  parsedToDos.forEach((item) => addTodo(item));
 
}

const getName = localStorage.getItem('id')

if(getName !== null){
    loginForm.classList ='none'
    afterLogin.classList =''
    userName.innerHTML = localStorage.getItem('id')
}

function allDeleteToDo(){
    localStorage.removeItem('todos')
}



loginForm.addEventListener("submit",saveInfo)

todoForm.addEventListener('submit', handleSubmit)

nameSetHtml.addEventListener('click', handleNameSetBtn )

toDoAllDeleteBtn.addEventListener('click',  allDeleteToDo)