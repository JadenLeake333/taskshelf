const express = require('express');
const sqlite3 = require('sqlite3').verbose(); // Database
var path = require('path');

const app = express();
app.engine('html', require('ejs').renderFile); // EJS Template Engine
app.set('view engine', 'html');

const { database } = require('../database.js');

const db = new database();

app.use('/static', express.static('public')) // Serve Static Files

module.exports = function(app){
    app.post('/addSubject',function(request, response) {
        if(request.session.loggedin){
            console.log(typeof(request.body.tasks))
            if(typeof(request.body.tasks) == "object")
                var tasks = cleanCommas(request.body.tasks)
            else{
                var tasks = request.body.tasks
            }

            db.queryDB(`INSERT INTO class_list(USERID,CLASSNAME,TASKS,DUE)
            VALUES(${request.session.ids},"${request.body.subject}","${tasks}","${request.body.date}")`,"class list")
            response.redirect('/home')
        }
        else{
            response.redirect('/')
        }

    });

    app.get('/getSubjectTasks',function(request, response) {
        if(request.session.loggedin){
            db.getSubjectTasks(response, request.session.ids)
        }
    });
}

const cleanCommas = (arr) => {
    arr.forEach((x, idx) => {
        arr[idx] = arr[idx].replace(",","")
    })
    return arr
}