let form = document.querySelector("#form")
    inputElement = document.querySelector("#todo-item")
    items = document.querySelector("#items")
    error = document.querySelector("#error")
    clear = document.querySelector("#clear")

const todoItems = JSON.parse(localStorage.getItem("todo-items"))

if(todoItems){
    let todoList = todoItems.map((item,index)=>{

        let completeTaskIcon = document.createElement("i")
        completeTaskIcon.classList.add("fas")
        completeTaskIcon.classList.add("fa-thumbs-up")
        completeTaskIcon.classList.add("complete")

        let editTaskIcon = document.createElement("i")
        editTaskIcon.classList.add("fas")
        editTaskIcon.classList.add("fa-pencil")
        editTaskIcon.classList.add("edit")

        let deleteTaskIcon = document.createElement("i")
        deleteTaskIcon.classList.add("fas")
        deleteTaskIcon.classList.add("fa-trash-can")
        deleteTaskIcon.classList.add("delete")

        let listElement = document.createElement("li")

        if(item.completed == true){
            listElement.style.textDecoration = "line-through"
        }

        listElement.innerText = item.activity
        listElement.appendChild(completeTaskIcon)
        listElement.appendChild(deleteTaskIcon)
        listElement.appendChild(editTaskIcon)

        listElement.id = index
        completeTaskIcon.addEventListener("click",(e)=>{
            listElement.classList.toggle("completed")
            updateTask() 
        })

        editTaskIcon.addEventListener("click",()=>{
            inputElement.value = item.activity
            listElement.classList.add("update")
            let obj = {"date":new Date(),"activity":item.activity,"completed":item.completed}

            localStorage.setItem("single-item",JSON.stringify(obj))
        })

        deleteTaskIcon.addEventListener("click",()=>{
            if(item){
                deleteTaskIcon.parentNode.remove()
                updateTask() 
            }
        })
        
        return listElement
        })
        items.append(...todoList)
}else{
    error.innerHTML = `<span id="error-span">There are currently no tasks available.</span>`
} 


form.addEventListener("submit",(e)=>{
    e.preventDefault()

    if(inputElement.value === ""){
        inputElement.style.borderColor = "#dc3545";
        error.innerHTML = `<span>The input field is required.</span>`
        inputElement.focus()
        console.log("The input field is required.")
    }else{
        error.innerHTML =""
        inputElement.focus()
        let listElement = [...document.querySelectorAll("li")]
        let oneItem = JSON.parse(localStorage.getItem("single-item"))
        let item = listElement.some(i => i.innerText === oneItem.activity)
    
        if(oneItem !== null && item){
            let obj = {"date":new Date(),"activity":oneItem.activity,"completed":oneItem.completed}
            let newObj = {"date":new Date(),"activity":inputElement.value,"completed":oneItem.completed}
            let p = todoItems.slice()
            let existingObj = p.find(item =>item.activity === obj.activity)
            if(existingObj){
                    Object.assign(existingObj,newObj)
                }else{
                    p.push(newObj)
                }
            localStorage.setItem("todo-items",JSON.stringify(p)) 
            reload()
        }else{
            if(todoItems && todoItems.some(item => item.activity === inputElement.value)){
                inputElement.style.borderColor = "#dc3545";
                error.innerHTML = `<span>This task already exists.</span>`
                inputElement.focus()
            } else{
                addItem()
            }
        }
    }
})

function completeTask(task){
   let items = JSON.parse(localStorage.getItem("todo-items"))

   items.forEach(item=>{
        if (item.activity === task) {
            item.completed = !item.completed;
        }
    })
    localStorage.setItem("todo-items", JSON.stringify(items));
}

function editTask(task){
    let items = JSON.parse(localStorage.getItem("todo-items"))

    items.forEach(item=>{
        if (item.activity === task) {
            item.activity = inputElement.value;
            item.completed = item.completed;
        }
    })
    localStorage.setItem("todo-items", JSON.stringify(items));
}

function updateTask(){
   let items = document.querySelectorAll("li")
   const toDos = []

   items.forEach(item=>toDos.push({
        date:new Date(),
        activity:item.innerText,
        completed:item.classList.contains("completed")
   }))
   localStorage.setItem("todo-items", JSON.stringify(toDos));
}

function addItem(){
    location.reload()
    let completeTaskIcon = document.createElement("i")
        completeTaskIcon.classList.add("fas")
        completeTaskIcon.classList.add("fa-thumbs-up")
        completeTaskIcon.classList.add("complete")

        let editTaskIcon = document.createElement("i")
        editTaskIcon.classList.add("fas")
        editTaskIcon.classList.add("fa-pencil")
        editTaskIcon.classList.add("edit")

        let deleteTaskIcon = document.createElement("i")
        deleteTaskIcon.classList.add("fas")
        deleteTaskIcon.classList.add("fa-trash-can")
        deleteTaskIcon.classList.add("delete")

    let itemList = document.createElement("li")
    let item = inputElement.value
    itemList.innerText = item
    
    items.prepend(itemList)
    itemList.prepend(completeTaskIcon)
    itemList.prepend(editTaskIcon)
    itemList.prepend(deleteTaskIcon)

    inputElement.focus()
    inputElement.value = ""

    addToStorage({
        date:new Date(),
        activity:item,
        completed:false
    })
}
if(todoItems == null){
    clear.style.display= "none"
}
clear.addEventListener("click",(e) =>{
    window.localStorage.clear();
    reload()
})

function addToStorage(todo){
    const listItems = JSON.parse(localStorage.getItem("todo-items"))
    if(listItems){
        listItems.unshift(todo)
        localStorage.setItem("todo-items",JSON.stringify(listItems))
    }else{
        let todoItems = [todo]
        localStorage.setItem("todo-items",JSON.stringify(todoItems))
    }
}

function reload(){
    location.reload();
}