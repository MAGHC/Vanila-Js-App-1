
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


const allReset = document.querySelector('.allReset')


let grabToDoList = document.querySelector('.grabToDoList')


const todoForm = document.querySelector('.todoForm')

setInterval(()=>{clockHtml.innerHTML = new Date()},1000)



function handleAllReset(event){
    event.preventDefault();
    localStorage.clear()

}


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
    
    userInputTodo.value = ''
    const newToDoObj ={
        id:Date.now(),
        text:newToDo
    }
    addTodo(newToDoObj)
    todos.push(newToDoObj)
    saveTodo()

}


function deleteTodo(event){
 const li = event.target.parentElement.parentElement
 todos = todos.filter(item=>item.id !== parseInt(li.id))
 li.remove()
 saveTodo()
}

function addTodo(newToDo){
    const li = document.createElement('li')
    const span =document.createElement('span')
    const button = document.createElement('button')

    button.addEventListener("click", deleteTodo )

        li.appendChild(span)
        li.id = newToDo.id
        span.innerText = newToDo.text
        span.appendChild(button)
        button.innerHTML="x"
        grabToDoList.appendChild(li)
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
    let listChildren = grabToDoList.children
    for(let i =0; i < listChildren.length ; i++){
        listChildren[i].parentNode.removeChild(listChildren[i])
        i--
      // i-- 를 해줘야 계속 갱신되는 length 값에 영향을 받지 않고 마지막까지 for를 돌리게됨 
        
  }

    
}



loginForm.addEventListener("submit",saveInfo)

todoForm.addEventListener('submit', handleSubmit)

nameSetHtml.addEventListener('click', handleNameSetBtn )

toDoAllDeleteBtn.addEventListener('click',  allDeleteToDo)

allReset.addEventListener('click', handleAllReset)