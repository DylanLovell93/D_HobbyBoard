const { request, response } = require("express");
const express = require("express");
const {
  addNewUser,
  getAllUsers,
  findUser,
  getOneUser,
  updateUser,
} = require("../queries/userQueries");

const users = express.Router();

module.exports = users;
//new user POST request
users.post("/", async (request, response) => {
  console.log(`POST request to users for: ${request.body.username}`);
  //likely add an existing user check here before it get to query
  //whenever we build out user lookup
  const newUser = await addNewUser(request.body);
  //check if new username was created/received
  if (newUser.username) {
    response.status(200).json(newUser);
  } else {
    //otherwise respond with an error code
    response.status(400).json("unable to create user");
  }
});

users.get("/", async (request, response) => {
  console.log("Get request to users");
  const allUsers = await getAllUsers();
  response.status(200).json(allUsers);
});

users.get("/:user", async (request, response) => {
  console.log("Get requested user's profile");
  const { user } = request.params;
  const targetUser = await getOneUser(user);
  response.status(200).json(targetUser);
});

// Boolean response for a signin check
users.post("/signin", async (request, response) => {
  console.log("Get signin check");
  const user = await findUser(request.body);
  if (user.username) {
    response.status(200).json(user.username);
  } else {
    response.status(400).json(false);
  }
});

users.put("/:user_name", async (request, response) => {
  console.log("Put request to users/username");
  const edits = request.body;
  const { user_name } = request.params;
  const editedUser = await updateUser(edits, user_name);
  response.status(200).json(editedUser);
});

module.exports = users;
