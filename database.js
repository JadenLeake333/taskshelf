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
      console.log(`${descriptor} created`)
    });
  }
 
   verify(email,pass){
   var search = `SELECT * FROM login
                 WHERE email=\"`+email+`\"
                 AND password=\"`+pass+`\";`
 
   console.log(search)
   this.db.all(search,(err,rows) =>{
       if(err){
         return console.log(err.message);
       }
 
       rows.forEach((row) => {
         return true;
       })
     })
   }
 // End Login DB
 
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
 
//  updateTable(id,date,newName){
//      var update = `UPDATE products 
//                    SET PRODUCT = \"`+newName+`\"
//                    WHERE USERID = `+id+` AND EXPIRATION= \"`+date+`\";`
 
//      this.db.all(update,(err) =>{
//        //console.log(update)
//        if(err){
//          console.log(err.message)
//        }
//        console.log("Table updated")
//      })
//    }
}

 module.exports={
   database
 };
 