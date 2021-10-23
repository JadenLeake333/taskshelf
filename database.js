class database{
    constructor(){
       const sqlite3 = require('sqlite3').verbose();
       this.type = "mv";
       this.db = new sqlite3.Database('mydb', (err) => {
       if (err) {
         return console.error(err.message);
       }
       console.log('Connected to the database from database');
     });  
 }
 
 initalize() {
    this.queryDB(`CREATE TABLE IF NOT EXISTS login(
                USERID INTEGER PRIMARY KEY AUTOINCREMENT,
                EMAIL TEXT NOT NULL UNIQUE,
                PASSWORD TEXT NOT NULL);`,"Login Table created")

    this.queryDB(`CREATE TABLE IF NOT EXISTS task_list(
                TASKID INTEGER PRIMARY KEY AUTOINCREMENT,
                USERID INTEGER,
                CLASSNAME TEXT NOT NULL,
                TASKS TEXT NOT NULL,
                DUE DATE NOT NULL);`,"task_list Table created")
    
    this.queryDB(`CREATE TABLE IF NOT EXISTS subjects(
                USERID INTEGER,
                CLASSNAME TEXT NOT NULL);`,"subjects Table created")
 }

 dropTable(tablename){
     var drop = `DROP TABLE `+tablename+`;`
      this.db.run(drop, (err) =>{
       if(err){
         return console.log(err.message);
       }
       console.log("Table DROPPED")
     });
   }
 
  queryDB(query, descriptor="") {
    this.db.run(query, (err) =>{
      if(err){
        return console.log(err.message);
      }
      console.log(`${descriptor}`)
    });
  }

  getSubjects(res, id) {
    this.db.all(`SELECT CLASSNAME FROM subjects WHERE USERID = ${id}`,(err,rows) => {
      if (err) {
          throw err;
        }
    res.send(rows);
    })
  }

  getTasks(res, id) {
    this.db.all(`SELECT CLASSNAME, TASKID, TASKS, DUE FROM task_list WHERE USERID = ${id}`,(err,rows) => {
      if (err) {
          throw err;
        }
      res.send({"task_data":rows});
    })
  }

  queryTasks(res, id, classname) {
    this.db.all(`SELECT TASKID, TASKS, DUE FROM task_list WHERE USERID = ${id} AND CLASSNAME = '${classname}'`,(err,rows) => {
      if (err) {
          throw err;
        }
      res.send({"task_data":rows});
    })
  }

  getUpcomingTasks(res, id) {
    this.db.all(`SELECT CLASSNAME, TASKS, DUE FROM task_list WHERE USERID = ${id}`,(err,rows) => {
      if (err) {
          throw err;
        }
    res.send({"task_data":rows});
    })
  }
 //Print Table
   
   printTable(table){
     var print = "SELECT * FROM "+table+";"
      this.db.all(print,(err,rows) =>{
       if(err){
         return console.log(err.message);
       }
       rows.forEach((row) => {
         console.log(row)
       })
     })
   }
}

 module.exports={
   database
 };
 