const express = require("express");
var cors = require("cors");
var bodyParser = require('body-parser');

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors())

var jsonBodyParser = bodyParser.json({type: "application/json"});

app.post("/register", jsonBodyParser, async (req, res) => {
  try {
    console.log("/register POST Request Received");
    var {name, username, password, type} = req.body;

    console.log(name + " " + username + " " + password + " " + type);
    res.send("Validated");
    res.status(201);
  } catch (err) {
    console.log(err);
    res.status(400);
  }
})

app.post("/login", jsonBodyParser, async (req, res) => {
  try {
    console.log("/login POST Request Received");
    var {username, password} = req.body;

    console.log(username + " " + password);
    res.send("Validated");
    res.status(201)
  } catch (err) {
    console.log(err);
    res.status(400);
  }
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});