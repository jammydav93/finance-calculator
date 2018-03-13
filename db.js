var sqlite3 = require('sqlite3').verbose();
var SQLBuilder = require('json-sql-builder2');

var db = new sqlite3.Database('./db/recurrences.db', (err) => {
  if (err){
    throw err
  }
  console.log('connected to \"./db/recurrences.db\"...')
});

var sql = new SQLBuilder('SQLite')

var a = sql.$insert({
  $table: 'users',
  $documents: {
    name: 'James',
    lastName: 'poo'
  }
});

db.serialize(function() {
  //db.run("CREATE TABLE users (name TEXT, lastName TEXT)");
  console.log(a);
   db.run(a.sql, a.values, function(err) {
    if (err) {
      return console.log(err.message);
    }
    console.log('A row has been inserted with rowid', this.lastID);
   });

  db.all("SELECT * FROM users", [], (err, rows) => {
    if (err){
      throw err;
    }

    rows.forEach((row) => {
      console.log(row);
    })
  });
});

db.close();
