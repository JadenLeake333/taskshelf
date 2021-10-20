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
 *    REMOVE MODAL   *
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
  let taskJSON = data.task_data
  let inputs = ""
  taskJSON.forEach((subject) =>{
    inputs += `<label class="fs-46" for="${subject.CLASSNAME}">${subject.CLASSNAME}</label><input class="remove-modal-input" type="checkbox" name="${subject.CLASSNAME}"><br>`
  })
  removeModalContent.insertAdjacentHTML('beforeend', inputs)
})

/**************************
 *    TASK ADD MODAL   *
 **************************/