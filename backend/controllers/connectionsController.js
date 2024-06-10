const express = require("express");
const connections = express();
const {
  joinRequest,
  deleteRequest,
  removeCollaborator,
  getAllProjectConnections,
  updateToCollaborator,
  getAllUserConnections,
  newFollower,
  getAllFollowers,
  removeFollower,
} = require("../queries/connectionsQueries");

//Send join request
connections.post("/", async (request, response, next) => {
  console.log("Post /connections");
  console.log(request.body);
  const pending = await joinRequest(request.body);
  response.status(200).json(pending);
  next();
});

//New follower
connections.post("/followers", async (request, response) => {
  console.log("Post /connections/followers");
  const following = await newFollower(request.body);
  response.status(200).json(following);
});

//Get all followers of single project
connections.get("/followers/:project_id", async (request, response) => {
  console.log("Post /connections/followers/:project_id");
  const followers = await getAllFollowers(request.params);
  response.status(200).json(followers);
});

connections.delete("/", async (request, response, next) => {
  console.log("delete /connections");
  const removeConnection = await deleteRequest(request.body);
  response.status(200).json(removeConnection);
  next();
});

connections.delete("/:username", async (request, response) => {
  const { username } = request.params;
  const { project_id } = request.body;
  console.log(`DELETE request for ${username} on project ${project_id}`);
  const removedCollaborator = await removeCollaborator(username, project_id);
  response.status(200).json(removedCollaborator);
});

connections.delete("/:username/follower", async (request, response) => {
  const { username } = request.params;
  const { project_id } = request.body;
  console.log(`DELETE request for ${username} on project ${project_id}`);
  const removedFollow = await removeFollower(username, project_id);
  response.status(200).json(removedFollow);
});

connections.get("/:project_id", async (request, response) => {
  console.log("get /connections");
  const projectConnections = await getAllProjectConnections(request.params);
  response.status(200).json(projectConnections);
});

connections.get("/associated/:username", async (request, response) => {
  console.log("get user /connections");
  console.log(request.params);
  const userConnections = await getAllUserConnections(request.params);
  response.status(200).json(userConnections);
});

connections.put("/", async (request, response, next) => {
  console.log("put /connections");
  const newConnection = await updateToCollaborator(request.body);
  response.status(200).json(newConnection);
  next();
});

module.exports = connections;
