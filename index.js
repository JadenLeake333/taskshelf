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
require('./routes/task_functions')(app);

//Init database
const db = new database();
// db.dropTable("task_list")
// db.dropTable("subjects")
db.initalize()
db.printTable("task_list")

app.listen(3000, () => {
  console.log('server started on port 3000');
});