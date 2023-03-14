//import db
const db = require("../db/dbConfig");

//create queries

//getAllPosts query
const getAllPosts = async ({ project_id }) => {
  try {
    const allPosts = await db.any(
      "SELECT * FROM posts WHERE project_id=$1 ORDER BY date ASC",
      project_id
    );
    return allPosts;
  } catch (error) {
    return error;
  }
};

//getOnePost query
const getOnePost = async ({ project_id, post_id }) => {
  try {
    const onePost = await db.one(
      "SELECT * FROM posts WHERE project_id=$1 AND post_id=$2",
      [project_id, post_id]
    );
    return onePost;
  } catch (error) {
    return error;
  }
};

//createNewPost
const createPost = async (project_id, members_only, title, contents, date) => {
  try {
    const newPost = await db.one(
      "INSERT INTO posts (project_id, members_only, title, contents, date, likes) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [project_id, members_only, title, contents, date, [""]]
    );
    return newPost;
  } catch (error) {
    return error;
  }
};

//deletePost
const deletePost = async ({ project_id, post_id }) => {
  try {
    const newPost = await db.one(
      "DELETE FROM posts WHERE project_id=$1 AND post_id=$2 RETURNING *",
      [project_id, post_id]
    );
    return newPost;
  } catch (error) {
    console.log(error);
    return error;
  }
};

//getLikes
const getLikes = async (post_id) => {
  try {
    const likes = await db.one("SELECT likes FROM posts WHERE post_id=$1", [
      post_id,
    ]);
    return likes;
  } catch (error) {
    return error;
  }
};

//like/unlike
const postLike = async (post_id, username) => {
  let currentLikes = await getLikes(post_id);
  //check if user already in the like array
  let count = currentLikes.likes.length;
  if (currentLikes.likes.includes(username)) {
    //if so remove
    const removeLike = await db.one(
      "UPDATE posts SET likes=array_remove(likes, $1) WHERE post_id=$2 RETURNING *",
      [username, post_id]
    );
    return count - 1;
  } else {
    //if not add
    const addLike = await db.one(
      "UPDATE posts SET likes=array_append(likes, $1) WHERE post_id=$2 RETURNING *",
      [username, post_id]
    );
    return count + 1;
  }
};

//export queries
module.exports = {
  getAllPosts,
  getOnePost,
  createPost,
  deletePost,
  getLikes,
  postLike,
};
