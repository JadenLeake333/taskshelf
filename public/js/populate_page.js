const parentDiv = document.getElementsByClassName("classes")[0]
const upcomingTasks = document.getElementsByClassName("sidebar-header")[0]

const pluralize = (word, num) => {
    if (num == 1) {
        return word
    }
    else{
        return word + "s"
    }
}

const makeCollapse = () => {
    var collapse = document.getElementsByClassName("collapsible");
    console.log(collapse.length)
    for (let i = 0; i < collapse.length; i++) {
      collapse[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight){
          content.style.maxHeight = null;
        } else {
          content.style.maxHeight = content.scrollHeight + "px";
        } 
      });
    } 
}

fetch("/getSubjects")
.then(response => response.json())
.then(data => {
    
    let taskJSON = data.task_data
    var taskDiv = '';
    //Main Section
    if(taskJSON.length == 0) {
        parentDiv.insertAdjacentHTML('beforeend', `<h1 class="color-black" style="text-align: center;">
        You have no current subjects, try adding one!</h1>`)
    }
    for (var i = 0; i < taskJSON.length; i++){
        let taskList = JSON.parse(taskJSON[i].TASKS)
        let plural = pluralize("task", taskList.tasks.length)
        taskDiv += `<div class="active-classes">
                            <h1 class="collapsible color-secondary-1-1">${taskJSON[i].CLASSNAME}
                                <span class="num-tasks"> - ${taskList.tasks.length} ${plural}</span>
                            </h1>
                            <div class="content">`
        var tasks = "";
        for (var j = 0; j < taskList.tasks.length; j++){
            tasks += `<div class="tasks flex-row">
                <p id="${taskJSON[i].CLASSNAME}-${j}-task" class="color-white fs-24">${taskList.tasks[j]}</p>
                <p id="${taskJSON[i].CLASSNAME}-${j}-date" class="color-white fs-24">${taskList.due[j]}</p>
                <span class="color-white fs-24 flex-row" id="${taskJSON[i].CLASSNAME}" >
                    <img id="add-${taskJSON[i].CLASSNAME}-${j}" src="https://img.icons8.com/fluency-systems-regular/48/000000/plus--v1.png"/>
                    <img id="edit-${taskJSON[i].CLASSNAME}-${j}" src="https://img.icons8.com/material-outlined/48/000000/pencil--v1.png"/>
                    <img id="delete-${taskJSON[i].CLASSNAME}-${j}" src="https://img.icons8.com/material-outlined/48/000000/trash--v1.png"/>
                </span>
            </div>`
        }
        tasks += "</div></div>"
        taskDiv += tasks
    }
    // console.log(taskDiv)
    parentDiv.insertAdjacentHTML('beforeend', taskDiv)
    makeCollapse()

    // Strikethough text when clicking image
    $("img").on("click", function() {
        let id = this.id
        console.log("hey")
        let subjectName = this.parentNode.id
        switch(id.substring(0,id.indexOf("-"))){
            case "add":
                console.log("ay")
                const modal = document.getElementById("addModalDiv");

                // Get the button that opens the modal
                const btn = document.getElementById(`${this.id}`);

                // Get the <span> element that closes the modal
                const span = document.getElementsByClassName("close")[2];

                const modalContent = document.getElementsByClassName("add-task-que")[0];

                const taskBtn = document.getElementById("add-task2");
                
                // When the user clicks on the button, open the modal
                btn.onclick = function() {
                    modal.style.display = "block";
                }

                // When the user clicks on <span> (x), close the modal
                span.onclick = function() {
                    modal.style.display = "none";
                }

                taskBtn.onclick = function() {
                    const taskInput = document.createElement("input")

                    const taskLabel = document.createElement("label")
                    taskLabel.setAttribute("for", "tasks")
                    taskLabel.innerHTML = "Task"
                    
                    taskInput.setAttribute("type","text")
                    taskInput.setAttribute("class","modal-input")
                    taskInput.setAttribute("name","tasks")
                    taskInput.setAttribute("required","")

                    modalContent.appendChild(taskInput)
                    modalContent.appendChild(taskLabel)
                
                    const taskDate = document.createElement("input")

                    const dateLabel = document.createElement("label")
                    dateLabel.setAttribute("for", "date")
                    dateLabel.innerHTML = "Date Due"

                    taskDate.setAttribute("type","date")
                    taskDate.setAttribute("class","modal-input")
                    taskDate.setAttribute("name","date")
                    taskDate.setAttribute("required","")

                    modalContent.appendChild(taskDate)
                    modalContent.appendChild(dateLabel)
                }

                // When the user clicks anywhere outside of the modal, close it
                window.onclick = function(event) {
                    if (event.target == modal) {
                        modal.style.display = "none";
                    }
                } 
                break;
            case "edit":
                break;
            case "delete":
                break;

        }
        
    })
});

//Right sidebar
fetch("/getUpcomingTasks")
.then(response => response.json())
.then(data => {
    let taskJSON = data.task_data

    taskJSON.forEach((task, idx) =>{
        var tasks = JSON.parse(task.TASKS)
        tasks.due.forEach((due,index) =>{
            var upcomingDiv = ''
            let dateDue = new Date(due)
            let today = new Date(Date.now())

            const diffTime = dateDue - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            let color = diffDays <=1 ? "red" : "orange";
            let dueString = diffDays == 0 ? "DUE TODAY" : diffDays < 0 ? "LATE" : `${diffDays}  ${pluralize("day", diffDays)} left!`
            if(diffDays <= 3) {
                upcomingDiv += `<div class="upcoming-tasks flex-row">
                <p class="upcoming-tasks-data__first color-white fs-24">${task.CLASSNAME}-${tasks.tasks[index]}</p>
                <p class="upcoming-tasks-data color-white fs-24">${due}</p>
                <p class="upcoming-tasks-data color-white fs-24" style="color: ${color}">${dueString}</p>
                </div>`
                upcomingTasks.insertAdjacentHTML('beforeend', upcomingDiv)
            }
        })
    })
})


