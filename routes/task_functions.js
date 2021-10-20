const express = require('express');
var cors = require('cors'); // Stuff like DELETE and PUT requests
const url = require('url');
const querystring = require('querystring');

const app = express();
app.engine('html', require('ejs').renderFile); // EJS Template Engine
app.set('view engine', 'html');
app.use(cors())

const { database } = require('../database.js');
const { query } = require('express');

const db = new database();

app.use('/static', express.static('public')) // Serve Static Files

module.exports = function(app){
    app.post('/addSubject',function(request, response) {
        if(request.session.loggedin){
            let taskJSON = {
                "tasks":request.body.tasks,
                "due": request.body.date
            }
            if (typeof(request.body.tasks) == "object"){
                db.queryDB(`INSERT INTO task_list(USERID,CLASSNAME,TASKS)
                            VALUES(${request.session.ids},"${request.body.subject}",'${JSON.stringify(taskJSON)}')`,"task list")
            }else{
                taskJSON = {
                    "tasks":[request.body.tasks],
                    "due": [request.body.date]
                }
                db.queryDB(`INSERT INTO task_list(USERID,CLASSNAME,TASKS)
                            VALUES(${request.session.ids},"${request.body.subject}",'${JSON.stringify(taskJSON)}')`,"class list")
            }
            db.queryDB(`INSERT INTO subjects(USERID,CLASSNAME)
                                VALUES(${request.session.ids},"${request.body.subject}")`,"subject")
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

    app.get('/getUpcomingTasks',function(request, response) {
        if(request.session.loggedin){
            db.getUpcomingTasks(response, request.session.ids)
        }
    });
}