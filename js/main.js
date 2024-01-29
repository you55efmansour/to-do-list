let inputText = document.querySelector(".input")
let btn = document.querySelector(".add")
let taskZone = document.querySelector(".tasks")
let tasksArray=[]

if (localStorage.getItem("task")) {
    tasksArray = JSON.parse(localStorage.getItem("task"));
}

getTasks()

btn.addEventListener("click",(e)=>{
    e.preventDefault()
    if (inputText.value == "") {
        
    }else{
        addTask(inputText.value)
        inputText.value= ""
    }
})

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
        
        // add done 
        if (tasksArray[i].done) {
            taskDiv.classList.add("done")
        }

        taskDiv.setAttribute("task-id",tasksArray[i].id)
        let textD =  document.createElement("div")
        textD.append(tasksArray[i].body)
        taskDiv.append(textD)
        let dSpan = document.createElement("i")
        dSpan.classList.add("delete", "fa-solid", "fa-trash")
        taskDiv.append(dSpan)
        taskZone.appendChild(taskDiv)
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
    if (e.target.classList.contains("delete")) {
        removeTask(e.target.parentElement.getAttribute("task-id"))
        e.target.parentElement.classList.add("animate__animated", "animate__fadeOut")
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