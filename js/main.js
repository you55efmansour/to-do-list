const inputText = document.querySelector(".input")
const form = document.querySelector(".form")
const taskZone = document.querySelector(".tasks")
let tasksArray=[]

if (localStorage.getItem("task")) {
    tasksArray = JSON.parse(localStorage.getItem("task"));
}


getTasks()

//submit the form

const sub = (e)=> {
     e.preventDefault()
    if (inputText.value == "") {
        
    }else{
        addTask(inputText.value)
        inputText.value= ""
        taskZone.lastChild.classList.add("animate__animated", "animate__fadeInDown")
    }
}
form.addEventListener("submit",sub)

// add task to array

function addTask(text){
    const task = {
        id: Date.now(),
        body: text,
        done: false,
    };
    
    tasksArray.push(task)
    addToLocal(tasksArray)
    addTaskToPage(tasksArray)
}

// add task to task zone

function addTaskToPage(tasksArray){
    taskZone.innerHTML=""
    for (let i = 0; i < tasksArray.length; i++) {
        let taskDiv = document.createElement("div")
        taskDiv.classList.add("task")
        taskDiv.setAttribute("task-id",tasksArray[i].id)
        let textD =  document.createElement("div")
        textD.classList.add("my-text")
        textD.append(tasksArray[i].body)
        taskDiv.append(textD)
        let dSpan = document.createElement("i")
        dSpan.classList.add("delete", "fa-solid", "fa-trash")
        taskDiv.append(dSpan)
        taskZone.appendChild(taskDiv)
                
        // add done 
        if (tasksArray[i].done) {
            taskDiv.classList.add("done")
            textD.classList.add("done-text")
        }
    }
}


// add tasks to local storage 

function addToLocal(tasksArray) {
    window.localStorage.setItem("task",JSON.stringify(tasksArray))
}

// get tasks at the tasks zone 
function getTasks() {
    const tasks = JSON.parse(window.localStorage.getItem("task"))
    
    if (tasks) {
        addTaskToPage(tasks) 
    }
}



taskZone.addEventListener("click",(e)=>{
    if (e.target.classList.contains("task")) {
        addDone(e.target.getAttribute("task-id"))
    }
    if (e.target.classList.contains("my-text")) {
        addDone(e.target.parentElement.getAttribute("task-id"))
    }
    if (e.target.classList.contains("delete")) {
        removeTask(e.target.parentElement.getAttribute("task-id"))
        e.target.parentElement.classList.add("animate__animated", "animate__fadeOutUp")
        setInterval(()=>e.target.parentElement.remove(),500)
    }
})

// add done to task 
function addDone(targetId){
        for (let i = 0; i < tasksArray.length; i++) {
            if (targetId == tasksArray[i].id) {
                tasksArray[i].done === false ? tasksArray[i].done = true:tasksArray[i].done = false;
            }
        }
        addTaskToPage(tasksArray)
        addToLocal(tasksArray)
}

// remove task 

function removeTask(taskId){
    tasksArray = tasksArray.filter((task)=> task.id != taskId )
    addToLocal(tasksArray)
}



//
//
//
//
//
//
//
//
//
//

const toggle = document.querySelector("#night-light-checkbox")
const body = document.body

// Check if mode is saved in localStorage
const savedMode = localStorage.getItem('darkMode')
if (savedMode === 'true') {
    body.classList.remove('light-body')
    body.classList.add('dark-body')
    toggle.removeAttribute("checked")
    // Enable dark mode CSS, disable light mode CSS
    document.querySelector('link[href*="dark-mode.css"]').disabled = false
    document.querySelector('link[href*="light-mode.css"]').disabled = true
} else if (savedMode === 'false') {
    body.classList.remove('dark-body')
    body.classList.add('light-body')
    toggle.setAttribute("checked", "")
    // Enable light mode CSS, disable dark mode CSS
    document.querySelector('link[href*="light-mode.css"]').disabled = false
    document.querySelector('link[href*="dark-mode.css"]').disabled = true
}

const handleMode = ()=> {
        if (toggle.hasAttribute("checked")) {
            // Switch to dark mode
            toggle.removeAttribute("checked")
            body.classList.remove('light-body')
            body.classList.add('dark-body')
            localStorage.setItem('darkMode', 'true')
            
            // Enable dark mode CSS, disable light mode CSS
            document.querySelector('link[href*="dark-mode.css"]').disabled = false
            document.querySelector('link[href*="light-mode.css"]').disabled = true
        } else {
            // Switch to light mode
            toggle.setAttribute("checked", "")
            body.classList.remove('dark-body')
            body.classList.add('light-body')
            localStorage.setItem('darkMode', 'false')
            
            // Enable light mode CSS, disable dark mode CSS
            document.querySelector('link[href*="light-mode.css"]').disabled = false
            document.querySelector('link[href*="dark-mode.css"]').disabled = true
        }
        
}

toggle.addEventListener("click", handleMode)
