const db = require("../db/dbConfig");
const updateProjectQueryBuilder = require("../helperFunctions/queryHelpers");

const getAllProjects = async () => {
  const allProjects = await db.any("SELECT * FROM projects");
  return allProjects;
};

const getOneProject = async (project_id, getPosts) => {
  const queryString = getPosts
    ? "SELECT projects.*, json_agg(posts.*) as posts FROM projects JOIN (SELECT posts.*, json_agg(comments.*) as comments FROM posts JOIN comments ON posts.post_id = comments.post_id GROUP BY posts.post_id) as posts ON posts.project_id = projects.project_id WHERE projects.project_id = $1 GROUP BY projects.project_id;"
    : "SELECT * FROM projects WHERE project_id=$1";
  const targetProject = await db.one(queryString, project_id);
  return targetProject;
};

//createProject async function
//input(project)
//output new project
const createProject = async ({
  name,
  details,
  project_image,
  archived,
  creator,
}) => {
  const newProject = await db.one(
    "INSERT INTO projects (name, details, project_image, archived, creator) VALUES ($1, $2, $3, $4, $5) RETURNING *",
    [name, details, project_image, archived, creator]
  );
  await db.one(
    "INSERT INTO connections (username, project_id, permissions) VALUES ($1, $2, $3) RETURNING *",
    [newProject.creator, newProject.project_id, "owner"]
  );
  return newProject;
};

//deleteProject async function
//input(id)
//output delete project
const deleteProject = async (id) => {
  // try to delete project
  const removeProject = await db.one(
    "DELETE FROM projects WHERE project_id=$1 RETURNING *",
    id
  );
  return removeProject;
};

//updateProject function
//input(id, project)
//output updated project
const updateProject = async (
  id,
  { name, details, project_image, archived }
) => {
  const updateQuery = updateProjectQueryBuilder({
    id,
    name,
    details,
    project_image,
    archived,
  });
  //try to update project
  const update = await db.one(
    "UPDATE projects SET " +
      updateQuery.queryString +
      " WHERE project_id=$1 RETURNING *",
    updateQuery.queryVariables
  );
  //return update
  return update;
};

//export query functions
module.exports = {
  getAllProjects,
  createProject,
  getOneProject,
  deleteProject,
  updateProject,
};
