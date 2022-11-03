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
    let validated = await db.createUser(req.body);
    if (validated) {
      res.status(201).send("Validated")
    } else {
      res.send(401).send("Not validated");
    }
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

app.post("/createEvent", jsonBodyParser, async (req, res) => {
  try {
    console.log("/createEvent POST Request received");
    var {eventName, host, location, dateTime, description} = req.body;
    if (!eventName || !host || !location || !description || !dateTime || dateTime.length < 16) {
      res.status(400).send("Invalid inputs");
    }

    let validated = await db.createEvent({
      "name": eventName,
      "description": description,
      "host": host,
      "location": location,
      "time": dateTime
    });

    if (validated) {
      res.status(201);
    } else {
      res.status(400);
    }
  } catch (err) {
    console.log(err);
    res.status(400);
  }
})

app.get("/events", async(req, res) => {
  try {
    console.log("/events GET Request Received");

    return await db.getAllEvents();
  } catch (err) {
    console.log(err);
    res.status(400);
  }
})

app.delete("/event", jsonBodyParser, async(req, res) => {
  try {
    console.log("/event DELETE Request Received");
    var eventName = req.body;

    let value = await db.deleteEvent(eventName);

    if (value) {
      res.status(200);
    } else {
      res.status(400);
    }
  } catch (err) {
    console.log(err);
    res.status(400);
  }
})

app.get("/users", async (req, res) => {
  try {
    console.log("/users GET Request Received");

    var username = req.body;

    let type = await db.getUser(username);

    return type;
  } catch (err) {
    console.log(err);
    res.status(400);
  }
})

app.listen(PORT, async () => {
  await db.connect();
  console.log(`Server listening on ${PORT}`);
});