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
    console.log(req.body);
    //var {eventName, description, host, location, dateTime} = req.body;
   /*
    if (!eventName || !host || !location || !description || !dateTime || dateTime.length < 16) {
      res.status(400).send("Invalid inputs");
      return;
    }
  */
    //console.log(eventName + " " + host + " " + location + " " + dateTime + " " + description)
    let validated = await db.createEvent({
      name: req.body.eventName,
      description: req.body.description,
      host: req.body.host,
      location: req.body.location,
      time: req.body.dateTime,
      endTime: req.body.endDateTime,
      max_capacity: req.body.max_capacity,
      rsvp: req.body.rsvp,
      inviteOnly: req.body.inviteOnly,
      inviteList: req.body.inviteList
    });

    if (validated) {
      res.status(201);
    } else {
      res.status(400);
    }
    res.send();
  } catch (err) {
    console.log(err);
    res.status(400);
  }
})

app.post("/searchEvent", jsonBodyParser, async (req, res) => {
  try {
    console.log("/searchEvent POST Request received");
    console.log(req.body);
    var time = req.body.dateTime;
    var name = req.body.eventName;
    var host = req.body.hostName;
    console.log("yo")
    console.log(time);
    console.log(name);
    console.log(host);
    var filteredEvents = await db.searchEvent(time, name, host);
    console.log(filteredEvents)
    res.status(200).send(filteredEvents);
    } catch (err) {
      console.log(err);
      res.status(400);
    }
})

app.get("/events", async(req, res) => {
  try {
    console.log("/events GET Request Received");
    var events = await db.getAllEvents();
    console.log(events);
    res.status(200).send(events);
  } catch (err) {
    console.log(err);
    res.status(400);
  }
})

app.post("/deleteEvent", jsonBodyParser, async(req, res) => {
  try {
    console.log("/event DELETE Request Received");
    var {eventName} = req.body;

    let value = await db.deleteEvent(eventName);

    if (value > 0) {
      res.status(200);
    } else {
      res.status(404);
    }
    res.send()
  } catch (err) {
    console.log(err);
    res.status(400);
  }
})

app.post("/users", jsonBodyParser, async (req, res) => {
  try {
    console.log("/users POST Request Received");

    var {username} = req.body;

    let type = await db.getUser(username);

    res.status(200).send(type);
  } catch (err) {
    console.log(err);
    res.status(400);
  }
})

app.post("/editEvent", jsonBodyParser, async (req, res) => {
  try {
    console.log("/editEvent POST Request Received");
    var {eventName, updates} = req.body;

    var fUpdates = {}
    for (var key in updates) {
      if (updates[key] != "") {
        fUpdates[key] = updates[key]
      }
    }
    console.log(fUpdates)
    let changes = await db.updateEvent(eventName, fUpdates);
    res.status(200).send(changes);
  } catch(err) {
    console.log(err);
    res.status(400);
  }
})

app.post("/event", jsonBodyParser, async (req, res) => {
  try {
    console.log("/event POST Request Received");

    var {eventName} = req.body;

    let event = await db.getEvents(eventName);

    res.status(200).send(event);
  } catch (err) {
    console.log(err);
    res.status(400);
  }
})

app.listen(PORT, async () => {
  await db.connect();
  console.log(`Server listening on ${PORT}`);
});