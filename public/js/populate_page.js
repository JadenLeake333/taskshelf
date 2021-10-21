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
    if(data.length == 0) {
        parentDiv.insertAdjacentHTML('beforeend', `<h1 class="color-black" style="text-align: center;">
        You have no current subjects, try adding one!</h1>`)
        return;
    }

    data.forEach(className => {
        fetch("/queryTasks", {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(className)
        })
        .then(response => response.json())
        .then(tasks => {
            let taskJSON = tasks.task_data
            var taskDiv = '';

            let plural = pluralize("task", taskJSON.length)
            taskDiv += `<div class="active-classes">
                                <h1 class="collapsible color-secondary-1-1">${className.CLASSNAME}
                                    <span class="num-tasks"> - ${taskJSON.length} ${plural}</span>
                                </h1>
                                <div class="content">`
            var tasks = "";
            for (var j = 0; j < taskJSON.length; j++){
                tasks += `<div class="tasks flex-row">
                    <p id="${className.CLASSNAME}-${taskJSON[j].TASKID}-task" class="color-white fs-24">${taskJSON[j].TASKS}</p>
                    <p id="${className.CLASSNAME}-${taskJSON[j].TASKID}-date" class="color-white fs-24">${taskJSON[j].DUE}</p>
                    <span class="color-white fs-24 flex-row" id="${className.CLASSNAME}" >
                        <img id="add-${className.CLASSNAME}-${taskJSON[j].TASKID}" src="https://img.icons8.com/fluency-systems-regular/48/000000/plus--v1.png"/>
                        <img id="edit-${className.CLASSNAME}-${taskJSON[j].TASKID}" src="https://img.icons8.com/material-outlined/48/000000/pencil--v1.png"/>
                        <img id="delete-${className.CLASSNAME}-${taskJSON[j].TASKID}" src="https://img.icons8.com/material-outlined/48/000000/trash--v1.png"/>
                    </span>
                </div>`
            }
            makeCollapse()
            if(taskJSON.length == 0){
                tasks += `<div class="tasks flex-row">
                    <p class="color-white fs-24">Looks like you have no tasks here! Click on the + to add some!</p>
                    <span class="color-white fs-24 flex-row">
                        <img id="" src="https://img.icons8.com/fluency-systems-regular/48/000000/plus--v1.png"/>
                        <img id="" src="https://img.icons8.com/material-outlined/48/000000/pencil--v1.png"/>
                        <img id="" src="https://img.icons8.com/material-outlined/48/000000/trash--v1.png"/>
                    </span>
                </div>`
            }
            tasks += "</div></div>"
            taskDiv += tasks

            parentDiv.insertAdjacentHTML('beforeend', taskDiv)
            makeCollapse()

            $("img").on("click", function(){
                console.log(this)
            })
        })
        
    })
    
});

//Right sidebar
fetch("/getUpcomingTasks")
.then(response => response.json())
.then(data => {

    let taskJSON = data.task_data
    taskJSON.forEach((task, idx) =>{
            var upcomingDiv = ''
            let dateDue = new Date(task.DUE)
            let today = new Date(Date.now())

            const diffTime = dateDue - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            let color = diffDays <=1 ? "red" : "orange";
            let dueString = diffDays == 0 ? "DUE TODAY" : diffDays < 0 ? "LATE" : `${diffDays}  ${pluralize("day", diffDays)} left!`
            if(diffDays <= 3) {
                upcomingDiv += `<div class="upcoming-tasks flex-row">
                <p class="upcoming-tasks-data__first color-white fs-24">${task.CLASSNAME} - ${task.TASKS}</p>
                <p class="upcoming-tasks-data color-white fs-24">${task.DUE}</p>
                <p class="upcoming-tasks-data color-white fs-24" style="color: ${color}">${dueString}</p>
                </div>`
                upcomingTasks.insertAdjacentHTML('beforeend', upcomingDiv)
            }
    })
})

