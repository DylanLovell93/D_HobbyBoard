//import db
const db = require("../db/dbConfig");

//create queries

//getAllPosts query
const getAllPosts = async ({ project_id }) => {
  try {
    const allPosts = await db.any(
      `SELECT 
        posts.*, 
        count(likes.*) as totalLikes, 
        array_agg(likes.username) as likes, 
        (SELECT json_agg(comments.*) FROM comments WHERE posts.post_id = comments.post_id) as comments
      FROM posts 
      LEFT JOIN likes ON posts.post_id = likes.post_id 
      WHERE project_id=$1 
      GROUP BY posts.post_id`,
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
      `SELECT 
        posts.*,
        count(likes.*) as totalLikes,
        array_agg(likes.username) as likes, 
        (
          SELECT json_agg(comments.*) FROM comments WHERE comments.post_id = posts.post_id 
        ) as comments 
      FROM posts 
      LEFT JOIN likes ON posts.post_id = likes.post_id
      WHERE posts.project_id=$1 AND posts.post_id=$2 
      GROUP BY posts.post_id`,
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
      "INSERT INTO posts (project_id, members_only, title, contents, date) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [project_id, members_only, title, contents, date]
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
    const likes = await db.any("SELECT * FROM likes WHERE post_id=$1", [
      post_id,
    ]);
    return likes;
  } catch (error) {
    return error;
  }
};

//like/unlike
const postLike = async (post_id, username) => {
  const likes = await db.one(`SELECT toggle_likes($2, $1);`, [
    post_id,
    username,
  ]);
  return likes;
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
