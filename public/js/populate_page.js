const parentDiv = document.getElementsByClassName("classes")[0]

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

fetch("/getSubjectTasks")
.then(response => response.json())
.then(data => {
    
    let taskJSON = data.task_data
    
    var taskDiv = '';
    //needs to loops through JSON
    for (var i = 0; i < taskJSON.length; i++){
        var taskList = taskJSON[i].TASKS.split(",")
        var dateList = taskJSON[i].DUE.split(",")
        let pluralize = taskList.length > 1 || taskList.length == 0 ? "tasks" : "task"
        console.log(pluralize)
        taskDiv += `<div class="active-classes">
                            <h1 class="collapsible color-secondary-1-1">${taskJSON[i].CLASSNAME}<span class="num-tasks"> - ${taskList.length} ${pluralize}</span></h1>
                            <div class="content">`
        var tasks = "";
        for (var j = 0; j < taskList.length; j++){
            tasks += `<div class="tasks flex-row">
                <p class="color-white fs-24">${taskList[j]}</p>
                <p class="color-white fs-24">${dateList[j]}</p>
                <p class="color-white fs-24">Options</p>
            </div>`
        }
        tasks += "</div></div>"
        taskDiv += tasks
    }

    console.log(taskDiv)
    parentDiv.insertAdjacentHTML('beforeend', taskDiv)
    makeCollapse()
});