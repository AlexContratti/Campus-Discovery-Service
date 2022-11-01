const MongoClient = require('mongodb');
var url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, db) {
  if (err) throw err;

  var dbo = db.db("discovery_db");

  var dummyUser = { name: "Ben Dover", type: "Student", username: "Ilikemen", password: "password"};
  var dummyEvent = {name: "Slumber Party", host: "Panya", description: "goofy", location: "Pans City Market", time: "time for you to get a watch"};

  dbo.collection("users").insertOne(dummyUser, function(err, res) {
    if (err) throw err;
    console.log("user inserted");
    db.close();
  });

  dbo.collection("events").insertOne(dummyEvent, function(err, res) {
    if (err) throw err;
    console.log("event inserted");
    db.close();
  });
});