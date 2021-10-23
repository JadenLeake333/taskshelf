const express = require('express');
var cors = require('cors'); // Stuff like DELETE and PUT requests

const app = express();
app.engine('html', require('ejs').renderFile); // EJS Template Engine
app.set('view engine', 'html');
app.use(cors())

const { database } = require('../database.js');

const db = new database();

app.use('/static', express.static('public')) // Serve Static Files

module.exports = function(app){
    app.post('/addSubject',function(request, response) {
        if(request.session.loggedin){
            if(typeof(request.body.tasks) == "object"){
                for (let i = 0; i < request.body.tasks.length; i++){
                    db.queryDB(`INSERT INTO task_list(USERID,CLASSNAME,TASKS, DUE)
                                VALUES(${request.session.ids},"${request.body.subject}","${request.body.tasks[i]}","${request.body.date[i]}")`,"insert into class_list")
                }
            }else{
                db.queryDB(`INSERT INTO task_list(USERID,CLASSNAME,TASKS, DUE)
                                VALUES(${request.session.ids},"${request.body.subject}","${request.body.tasks}","${request.body.date}")`,"insert into class_list")
            }
            db.queryDB(`INSERT INTO subjects(USERID,CLASSNAME)
                            VALUES(${request.session.ids},"${request.body.subject}")`,"insert into class_list")
            response.redirect('/home')
        }
        else{
            response.redirect('/')
        }
    });

    app.get('/removeSubject', function(request, response){
        if(request.session.loggedin){
            let queryString = ""
            Object.keys(request.query).forEach(key => {
                queryString += `,"${key}"`
            })

            if (queryString[0] == ",") {
                queryString = queryString.replace(",", "")
            }

            db.queryDB(`DELETE FROM task_list
                        WHERE CLASSNAME IN (${queryString})`, "delete")

            db.queryDB(`DELETE FROM subjects
                        WHERE CLASSNAME IN (${queryString})`, "delete")
            
            response.redirect('/home')
            
        }
        else{
         response.redirect('/')
        }
    })

    app.get('/getSubjects',function(request, response) {
        if(request.session.loggedin){
            db.getSubjects(response, request.session.ids)
        }
    });

    app.put('/queryTasks',function(request, response) {
        if(request.session.loggedin){
            db.queryTasks(response, request.session.ids, request.body.CLASSNAME)
        }
    });

    app.get('/addTask',function(request, response) {
        if(request.session.loggedin){
            let subject = request.query.subject
            if(typeof(request.query.tasks) == "object"){
                for(let i = 0; i < request.query.tasks.length; i++){
                    db.queryDB(`INSERT INTO task_list(USERID,CLASSNAME,TASKS, DUE)
                                VALUES(${request.session.ids},"${subject}","${request.query.tasks[i]}","${request.query.date[i]}")`,"insert tasks")
                }
            }else{
                db.queryDB(`INSERT INTO task_list(USERID,CLASSNAME,TASKS, DUE)
                                VALUES(${request.session.ids},"${subject}","${request.query.tasks}","${request.query.date}")`,"insert tasks")
            }
            response.redirect('/home')
        }
        else{
            response.redirect('/')
        }
    });
    app.get('/getTasks',function(request, response) {
        if(request.session.loggedin){
            db.getTasks(response, request.session.ids)
        }
        else{
            response.redirect('/')
        }
    })

    app.get('/removeTask',function(request, response) {
        if(request.session.loggedin){
            Object.keys(request.query).forEach(id =>{
                db.queryDB(`DELETE FROM task_list
                            WHERE TASKID = ${id}`, "task deleted")
                })
                response.redirect('/home')
            }
        else{
            response.redirect('/')
        }
    })
    app.patch('/updateTasks',function(request, response) {
        if(request.session.loggedin){
            db.queryDB(`UPDATE task_list
                        SET TASKS = '${JSON.stringify(request.body.taskJSON)}'
                        WHERE CLASSNAME = '${request.body.subject}'`, "table updated")
        }else{
            response.redirect('/')
        }
    });

    app.patch('/editTasks',function(request, response) {
        if(request.session.loggedin){
            db.queryDB(`UPDATE task_list
                        SET TASKS = '${JSON.stringify(request.body.taskJSON)}'
                        WHERE CLASSNAME = '${request.body.subject}'`, "table updated")
        }else{
            response.redirect("/")
        }
    });

    app.get('/getUpcomingTasks',function(request, response) {
        if(request.session.loggedin){
            db.getUpcomingTasks(response, request.session.ids)
        }
    });
}