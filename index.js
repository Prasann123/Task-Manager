const express = require("express");
const cors = require("cors");
//const bodyParser = require("body-parser");
const { PORT } = require("./constants");
const routes = require("express").Router();
const taskInfo = require("./routes/taskinfo");

const app = express();

//Enable routing
app.use(routes);
app.use(cors);
//For using a middleware as json
//app.use(bodyParser.json);

// "/" configure default routing
routes.get("/", (req, res) => {
  //200 is positive response and with a message
  return res.status(200).send("Welcome to Task Manager application");
});

//Tasks router
routes.use("/tasks", taskInfo);
//Listening to a port it takes a callback
//Since there is no response or any data only error
app.listen(PORT, (err) => {
  if (!err) {
    console.log("Started server");
  } else {
    console.log("Error Occured");
  }
});
