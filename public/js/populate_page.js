const parentDiv = document.getElementsByClassName("classes")[0]
const upcomingTasks = document.getElementsByClassName("right-sidebar")[0]

const pluralize = (word, num) => {
    if (num === 1) {
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

async function getSubjects() {
    const subjects = await fetch("/getSubjects")
    return await subjects.json()
}

async function queryTasks(className) {
    const tasks = await fetch("/queryTasks", {
                                method: "PUT",
                                headers: {
                                    'Content-Type': 'application/json'
                                },
                                body: JSON.stringify(className)
                            })
    return await tasks.json()
}

//Right sidebar
async function getUpcoming () {
    const response = await fetch("/getUpcomingTasks")
    const data = await response.json()

    let taskJSON = data.task_data

    if (taskJSON.length === 0) {
        var upcomingDiv = `<div class="upcoming-tasks flex-row">
        <p class="upcoming-tasks-data__first color-white fs-24">Nothing due in the next 3 days!</p>`
        upcomingTasks.insertAdjacentHTML('beforeend', upcomingDiv)
        return
    }

    taskJSON.forEach((task) =>{
            var upcomingDiv = ''
            let dateDue = new Date(task.DUE)
            let today = new Date(Date.now())

            const diffTime = dateDue - today;
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            let color = diffDays <= 1 ? "red" : "orange";
            let dueString = diffDays === 0 ? "DUE TODAY" : diffDays < 0 ? "LATE" : `${diffDays}  ${pluralize("day", diffDays)} left!`
            if(diffDays <= 3) {
                upcomingDiv += `<div class="upcoming-tasks flex-row">
                <p class="upcoming-tasks-data__first color-white fs-24">${task.CLASSNAME} - ${task.TASKS}</p>
                <p class="upcoming-tasks-data color-white fs-24">${task.DUE}</p>
                <p class="upcoming-tasks-data color-white fs-24" style="color: ${color}">${dueString}</p>
                </div>`
                upcomingTasks.insertAdjacentHTML('beforeend', upcomingDiv)
            }
    }) 
}

getUpcoming();

async function mainDropdown() {
    let subjects = await getSubjects()
    if (subjects.length === 0) {
        var upcomingDiv = `<div class="active-classes">
        <h1 class="collapsible color-secondary-1-1">Try adding some subjects</h1>
        <div class="content"></div></div>`
        parentDiv.insertAdjacentHTML('beforeend', upcomingDiv)
        return
    }

    subjects.forEach( async function subject(subjects) {
            let tasks = await queryTasks(subjects)

            const { CLASSNAME } = subjects
            
            let taskJSON = tasks.task_data
            var taskDiv = '';

            let plural = pluralize("task", taskJSON.length)
            
            

            taskDiv += `<div class="active-classes">
                                <h1 class="collapsible color-secondary-1-1">${CLASSNAME}
                                    <span class="num-tasks"> - ${taskJSON.length} ${plural}</span>
                                </h1>
                                <div class="content">`

            var taskHTML = "";

            taskJSON.forEach((task) => {
                taskHTML += `<div class="tasks flex-row">
                    <p id="${CLASSNAME}-${task.TASKID}-task" class="color-white fs-24">${task.TASKS}</p>
                    <p id="${CLASSNAME}-${task.TASKID}-date" class="color-white fs-24">${task.DUE}</p>
                </div>`
            })

            makeCollapse()
            if(taskJSON.length === 0){
                taskHTML += `<div class="tasks flex-row">
                            <p class="color-white fs-24">Looks like you have no tasks here! Click on "Add Tasks" to add some!</p>
                          </div>`
            }
            taskHTML += "</div></div>"
            taskDiv += taskHTML

            parentDiv.insertAdjacentHTML('beforeend', taskDiv)
            makeCollapse()
        })
}

mainDropdown()