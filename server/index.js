const express = require("express");
var cors = require("cors");
var bodyParser = require('body-parser');
const { Database } = require('./connect_to_mongo');

let db = new Database();

const PORT = process.env.PORT || 3001;

const app = express();
app.use(cors());

var jsonBodyParser = bodyParser.json({type: "application/json"});
app.use(express.json());
app.use(express.urlencoded());

app.post("/register", async (req, res) => {
  try {
    console.log("/register POST Request Received");
    var {name, username, password, type} = req.body;
    console.log(name + " " + username + " " + password + " " + type);
    if (!name || !username || !password || !type) {
      res.status(400).send("Supply name, username, password, and type");
      return;
    }
    await db.createUser(req.body);
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
    if (!username || !password) {
      res.status(400).send("Supply username and password");
      return;
    }
    let validated = await db.getLogin(req.body);
    console.log(username + " " + password);
    if (validated) {
      res.status(200).send("Validated");
    } else {
      res.status(403).send("Invalid credentials");
    }

  } catch (err) {
    console.log(err);
    res.status(400);
  }
})

app.listen(PORT, async () => {
  await db.connect();
  console.log(`Server listening on ${PORT}`);
});