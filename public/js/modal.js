

/**************************
 *    SUBJECT ADD MODAL   *
 **************************/
// Get the modal
const modal = document.getElementById("myModal");

// Get the button that opens the modal
const btn = document.getElementById("myBtn");

// Get the <span> element that closes the modal
const span = document.getElementsByClassName("close")[0];

const taskBtn = document.getElementById("add-task");

const modalContent = document.getElementsByClassName("task-que")[0];


// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}

taskBtn.onclick = function() {
    const taskInput = document.createElement("input")
    taskInput.setAttribute("type","text")
    taskInput.setAttribute("class","modal-input")
    taskInput.setAttribute("name","tasks")
    taskInput.setAttribute("required","")
    modalContent.appendChild(taskInput)

    const taskDate = document.createElement("input")
    taskDate.setAttribute("type","date")
    taskDate.setAttribute("class","modal-input")
    taskDate.setAttribute("name","date")
    taskDate.setAttribute("required","")
    modalContent.appendChild(taskDate)
}

// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
} 

/*********************
 *    REMOVE SUBJECT MODAL   *
 *********************/
 const removeModal = document.getElementById("removeModalDiv");

 // Get the button that opens the modal
 const removeBtn = document.getElementById("removeModal");

 const removeSpan = document.getElementsByClassName("close")[1];
 const removeModalContent = document.getElementsByClassName("subject-que")[0];

 removeBtn.onclick = function() {
  removeModal.style.display = "block";
}

removeSpan.onclick = function() {
  removeModal.style.display = "none";
}


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == removeModal) {
    removeModal.style.display = "none";
  }
} 
fetch('/getSubjects')
.then(response => response.json())
.then(data => {
  let inputs = ""
  data.forEach((subject) =>{
    inputs += `<label class="fs-46" for="${subject.CLASSNAME}">${subject.CLASSNAME}</label><input class="remove-modal-input" type="checkbox" name="${subject.CLASSNAME}"><br>`
  })
  removeModalContent.insertAdjacentHTML('beforeend', inputs)
})

/**************************
 *    TASK ADD MODAL   *
 **************************/
 const addTaskDiv = document.getElementById("addModalDiv");

 // Get the button that opens the modal
 const addTaskBtn = document.getElementById("addTaskModal");
 const addMoreTaskBtn = document.getElementById("add-task2");

 const addTaskSpan = document.getElementsByClassName("close")[2];
 const taskQue = document.getElementById("insert-classes");
 const addTaskContent = document.getElementsByClassName("add-task-que")[0];

 addTaskBtn.onclick = function() {
  addTaskDiv.style.display = "block";
}

addTaskSpan.onclick = function() {
  addTaskDiv.style.display = "none";
}

addMoreTaskBtn.onclick = function() {
  const taskInput = document.createElement("input")
  const taskLabel = document.createElement("label")

  taskInput.setAttribute("type","text")
  taskInput.setAttribute("class","modal-input")
  taskInput.setAttribute("name","tasks")
  taskInput.setAttribute("required","")

  taskLabel.setAttribute("for", "tasks")
  taskLabel.innerHTML = "Task"

  addTaskContent.appendChild(taskLabel)
  addTaskContent.appendChild(taskInput)

  const taskDate = document.createElement("input")
  const dateLabel = document.createElement("label")
  taskDate.setAttribute("type","date")
  taskDate.setAttribute("class","modal-input")
  taskDate.setAttribute("name","date")
  taskDate.setAttribute("required","")

  dateLabel.setAttribute("for", "date")
  dateLabel.innerHTML = "Date"

  addTaskContent.appendChild(dateLabel)
  addTaskContent.appendChild(taskDate)
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == addTaskDiv) {
    addTaskDiv.style.display = "none";
  }
} 
fetch('/getSubjects')
.then(response => response.json())
.then(data => {
  let inputs = ""
  data.forEach((subject) =>{
    inputs += `<label class="fs-46 m-l-10" for="${subject.CLASSNAME}">${subject.CLASSNAME}</label><input class="add-modal-input" type="radio" value="${subject.CLASSNAME}" name="subject">&nbsp&nbsp`
  })
  taskQue.insertAdjacentHTML('beforeend', inputs)
})

/*********************
 *    REMOVE TASK MODAL   *
 *********************/
 const removeTaskModal = document.getElementById("removeTaskModalDiv");

 // Get the button that opens the modal
 const removeTaskBtn = document.getElementById("removeTaskModal");

 const removeTaskSpan = document.getElementsByClassName("close")[3];
 const removeTaskModalContent = document.getElementsByClassName("remove-task-que")[0];

 removeTaskBtn.onclick = function() {
  removeTaskModal.style.display = "block";
}

removeTaskSpan.onclick = function() {
  removeTaskModal.style.display = "none";
}


// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == removeTaskModal) {
    removeTaskModal.style.display = "none";
  }
} 
fetch('/getTasks')
.then(response => response.json())
.then(data => {
  let inputs = ""
  data.task_data.forEach((subject) =>{
    inputs += `<label class="fs-46" for="${subject.TASKS}">${subject.CLASSNAME} - ${subject.TASKS}</label><input class="remove-task-modal-input" type="checkbox" name="${subject.TASKID}"><br>`
  })
  removeTaskModalContent.insertAdjacentHTML('beforeend', inputs)
})