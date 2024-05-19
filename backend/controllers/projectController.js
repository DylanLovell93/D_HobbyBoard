const express = require("express");
const projects = express.Router();
const {
  getAllProjects,
  createProject,
  getOneProject,
  deleteProject,
  updateProject,
  updateArchiveStatus,
} = require("../queries/projectsQueries");

const {
  getAllPosts,
  getOnePost,
  createPost,
  deletePost,
} = require("../queries/postsQueries");

//get all project
projects.get("/", async (_, res) => {
  try {
    const allProjects = await getAllProjects();
    res.status(200).json(allProjects);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//get one project
projects.get("/:pid", async (req, res) => {
  const { pid } = req.params;
  const singleProject = await getOneProject(pid);
  res.status(200).json(singleProject);
});

//create project
projects.post("/", async (req, res) => {
  const addProject = await createProject(req.body);
  res.status(200).json(addProject);
});

//delete project
projects.delete("/:id", async (req, res) => {
  const removeProject = await deleteProject(req.params.id);
  removeProject.project_id
    ? res.status(200).json(removeProject)
    : res.status(404).json({ error: "error" });
});

//put project
projects.put("/:id", async (req, res) => {
  const update = await updateProject(req.params.id, req.body);
  update.project_id
    ? res.status(200).json(update)
    : res.status(404).json({ error: "error" });
});

//put project Archive status
projects.put("/:id/archive", async (request, response) => {
  const { id } = request.params;
  const currentStatus = await getOneProject(id);
  if (currentStatus.project_id) {
    const updatedStatus = await updateArchiveStatus(
      id,
      !currentStatus.archived
    );
    response.status(200).json(updatedStatus);
  } else {
    response.status(400).json("error: invalid ID");
  }
});

//get all post from project
projects.get("/:project_id/posts", async (request, response) => {
  const allPosts = await getAllPosts(request.params);
  Array.isArray(allPosts)
    ? response.status(200).json(allPosts)
    : response.status(400).json({ error: "error" });
});

//get one post from project
projects.get("/:project_id/posts/:post_id", async (request, response) => {
  const onePost = await getOnePost(request.params);
  onePost.project_id
    ? response.status(200).json(onePost)
    : response.status(400).json({ error: "error" });
});

//create new post
projects.post("/:project_id/posts", async (request, response) => {
  //get project id from params
  const { project_id } = request.params;
  //get members_only, title, and content from body
  const { members_only, title, contents } = request.body;
  //get current date
  const date = new Date(Date.now()).toISOString();
  //use data in query to make new post
  const newPost = await createPost(
    project_id,
    members_only,
    title,
    contents,
    date
  );
  //if successful, return respond with the post, if not, return error
  newPost.project_id
    ? response.status(200).json(newPost)
    : response.status(400).json({ error: "error" });
});

//delete post
projects.delete("/:project_id/posts/:post_id", async (request, response) => {
  const deletedPost = await deletePost(request.params);
  deletedPost.project_id
    ? response.status(200).json(deletedPost)
    : response.status(400).json({ error: "error" });
});

module.exports = projects;
