//Initialize all the packages we plan to use
const express = require('express'); // Routing
const sqlite3 = require('sqlite3').verbose(); // Database
var session = require('express-session'); // Session Variables
var bodyParser = require('body-parser'); // Reading JSON
var cors = require('cors'); // Stuff like DELETE and PUT requests
var path = require('path'); // Directory Paths
////////////////////////////////////////////

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(cors())
app.use(bodyParser.json()); // Needed to properly send JSON
app.use('/static', express.static('public')) // Serve Static Files

app.use(session({
	secret: '$dATCGQ4D555gisEKfbQy9yCi', // Make this random
	resave: true,
	saveUninitialized: true
}));

app.engine('html', require('ejs').renderFile); // EJS Template Engine
app.set('view engine', 'html');

const { database } = require('./database');
require('./routes/signin')(app);

//Init database
const db = new database();

datab = new sqlite3.Database('mydb', (err) => {
      if (err) {
        return console.error(err.message);
      }
      console.log('Connected to the database from index.js');
}); 

db.queryDB(`CREATE TABLE IF NOT EXISTS login(
                USERID INTEGER PRIMARY KEY AUTOINCREMENT,
                EMAIL TEXT NOT NULL UNIQUE,
                PASSWORD TEXT NOT NULL);`,"Login Table")

db.queryDB(`CREATE TABLE IF NOT EXISTS classes(
                USERID INTEGER,
                CLASSNAMES JSON);`,"classes Table")

db.queryDB(`CREATE TABLE IF NOT EXISTS class_list(
                USERID INTEGER PRIMARY KEY AUTOINCREMENT,
                CLASSNAME TEXT NOT NULL UNIQUE,
                TASKS JSON NOT NULL);`,"class_list Table")


app.listen(3000, () => {
  console.log('server started on port 3000');
});