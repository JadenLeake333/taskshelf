const express = require('express');
const sqlite3 = require('sqlite3').verbose(); // Database
const bcrypt = require('bcrypt'); // Encryption
var path = require('path');

const app = express();
var saltRounds = 10
app.engine('html', require('ejs').renderFile); // EJS Template Engine
app.set('view engine', 'html');

const { database } = require('../database.js');

const db = new database();

datab = new sqlite3.Database('mydb', (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Connected to the database from signin');
}); 

app.use('/static', express.static('public')) // Serve Static Files

module.exports = function(app){

//Login Screen
app.get('/',function(request, response) {
	response.render('../index.html',{message:''});
});

app.post('/auth', function(request, response) {
	var username = request.body.email;
	var password = request.body.pass;
  datab.all('SELECT password,userid FROM login WHERE email = ?;',[username],(err,rows) =>{
    if(rows.length > 0){
      bcrypt.compare(password, rows[0].PASSWORD, function(err, result) { // Compare an ordinary password to hashed version
      if (username && password && result == true) {
            request.session.loggedin = true;
            request.session.username = username;
            request.session.ids = rows[0].USERID;
            response.redirect('/home')
            //response.render('../templates/calendar.html',{name:request.session.username})
          } else {
              response.render('../index.html',{message:'Incorrect Username or Passsword!'});
              response.end();
          }
       });
    } else {
          response.render('../index.html',{message:'Incorrect Username or Passsword!'});
          response.end();
	      }
      }); 
    });
//End Login 

//Main Webpage
app.get('/home', function(request, response) {
  if(request.session.loggedin){
    response.render('../views/welcome.html');
  }
  else
    response.redirect('/')
});
//End Main Webpage

//Sign up
app.get('/signup', function(request, response){
  response.render("../views/signup.html")
});

app.post('/makeAccount', function(request,response){
  var username = request.body.email
  var pass = request.body.pass
  var verifypass = request.body.pass2
  if (pass === verifypass){
    datab.all('SELECT * FROM login WHERE email = ?',username,(err,rows) =>{
      if(rows.length == 0){
        bcrypt.hash(pass, saltRounds, function(err, hash) { // Encrypt the password into the db
          db.queryDB(`INSERT INTO login(email, password)
          VALUES("${username}","${hash}");`, "User")
        })
        response.redirect('/');
        response.end();
      }else{
      response.render('../views/signup.html',{message:'Username already taken'})
      response.end();
    }
    });
  }else{
    response.render('../views/signup.html',{message:'Passwords do not match!'})
  }
});
//End Signup
}