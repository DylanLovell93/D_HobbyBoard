// DEPENDENCIES
const cors = require("cors");
const express = require("express");
const http = require("http");

//IMPORT QUERIES
const { testQuery } = require("./queries/testQueries");

//IMPORT CONTROLLERS
const projectController = require("./controllers/projectController");
const userController = require("./controllers/userController");
const connectionsController = require("./controllers/connectionsController");
const postController = require("./controllers/postController");

// CONFIGURATION
const app = express();

const server = http.createServer(app);
const io = require("socket.io")(server, {
  cors: {
    origin: `*`,
  },
});

io.on("connection", (socket) => {
  console.log("Hi", socket.id);
});

// MIDDLEWARE
app.use(cors());
app.use(express.json()); // Parse incoming JSON

// ROUTES
app.use("/projects", projectController);
app.use("/users", userController);
app.use("/posts", postController);
app.use("/connections", connectionsController);
app.use("/connections", notify);

function notify(req, res) {
  const { project_id } = req.body;
  if (req.method === "POST" || req.method === "DELETE") {
    io.emit("request" + project_id, "New Request"); //rename
    console.log("New/DELETE Request");
  }
}

//async, so we can use query correctly
app.get("/", async (req, res) => {
  //use query function to get data from db
  const exampleData = await testQuery();
  res.send(exampleData.content);
});

// EXPORT
module.exports = server;
