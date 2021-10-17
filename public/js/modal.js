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