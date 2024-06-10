//import db variable
const db = require("../db/dbConfig");

//create join request async function
//input(requestInfo) requestInfo {username: "", project_id: ""}
//output inserted row
const joinRequest = async (requestInfo) => {
  const { username, project_id } = requestInfo;
  //try to create new join request to project_id
  try {
    const pending = await db.one(
      "INSERT INTO connections (username, project_id, permissions) VALUES ($1, $2, $3) RETURNING *",
      [username, project_id, "request"]
    );
    //return inserted row
    return pending;
  } catch (err) {
    //if err, return err
    return err;
  }
};

const deleteRequest = async ({ username, project_id }) => {
  try {
    const removeRequest = await db.one(
      "DELETE FROM connections WHERE username=$1 AND project_id=$2 AND permissions=$3 RETURNING *",
      [username, project_id, "request"]
    );

    return removeRequest;
  } catch (err) {
    return err;
  }
};

const removeCollaborator = async (username, project_id) => {
  try {
    const removedUser = await db.one(
      "DELETE FROM connections WHERE username=$1 AND project_id=$2 AND permissions='collaborator' RETURNING *",
      [username, project_id]
    );
    return removedUser;
  } catch (error) {
    return error;
  }
};

const removeFollower = async (username, project_id) => {
  try {
    const removedFollow = await db.one(
      "DELETE FROM connections WHERE username=$1 AND project_id=$2 AND permissions='follower' RETURNING *",
      [username, project_id]
    );
    return removedFollow;
  } catch (error) {
    return error;
  }
};

// input: object w/ project_id key
// output: array of objects reflecting all user connects w/ the project_id project
const getAllProjectConnections = async ({ project_id }) => {
  try {
    const allProCons = await db.any(
      "SELECT connections.username,permissions,connections.project_id,users.profile_image,projects.creator FROM connections JOIN users ON connections.username=users.username JOIN projects ON connections.project_id = projects.project_id WHERE connections.project_id=$1",
      project_id
    );
    return allProCons;
  } catch (err) {
    return err;
  }
};

const getAllUserConnections = async ({ username }) => {
  try {
    const allProCons = await db.any(
      "SELECT username,name,projects.project_id,permissions,project_image,projects.creator,projects.details FROM connections JOIN projects ON connections.project_id=projects.project_id WHERE username=$1",
      username
    );
    return allProCons;
  } catch (err) {
    return err;
  }
};

const updateToCollaborator = async ({ username, project_id }) => {
  try {
    const newConnection = await db.one(
      "UPDATE connections SET permissions=$4 WHERE username=$1 AND project_id=$2 AND permissions=$3 RETURNING *",
      [username, project_id, "request", "collaborator"]
    );
    return newConnection;
  } catch (err) {
    return err;
  }
};

const newFollower = async ({ username, project_id }) => {
  try {
    const following = await db.one(
      "INSERT INTO connections (username, project_id, permissions) VALUES ($1, $2, $3) RETURNING *",
      [username, project_id, "follower"]
    );
    return following;
  } catch (err) {
    return err;
  }
};

const getAllFollowers = async ({ project_id }) => {
  try {
    const followers = await db.one(
      "SELECT * FROM connections WHERE project_id=$1 AND permissions=$2",
      [pid, "follower"]
    );

    return followers;
  } catch (err) {
    return err;
  }
};

module.exports = {
  joinRequest,
  deleteRequest,
  getAllProjectConnections,
  removeCollaborator,
  updateToCollaborator,
  getAllUserConnections,
  newFollower,
  getAllFollowers,
  removeFollower,
};
