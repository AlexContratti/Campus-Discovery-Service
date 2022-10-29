const express = require("express");

const PORT = process.env.PORT || 3001;

const app = express();

app.post("/register", async (req, res) => {
  try {
    console.log("/register POST Request Received");
    var {name, username, password, type} = req.body;

    res.status(201);
  } catch (err) {
    console.log(err);
    res.status(400);
  }
})

app.post("/login", async (req, res) => {
  try {
    console.log("/login POST Request Received");
    var {username, password} = req.body;

    res.status(201)
  } catch (err) {
    console.log(err);
    res.status(400);
  }
})

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});