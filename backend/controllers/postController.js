//import express
const express = require("express");

//create variable for our router
const posts = express.Router();

//import queries
const {
  getAllComments,
  getOneComment,
  createComment,
  deleteComment,
} = require("../queries/commentsQueries");
const { getLikes, postLike } = require("../queries/postsQueries");

//create routes

// getAllcomments from post
posts.get("/:post_id/comments", async (request, response) => {
  console.log(`get request to posts/${request.params.post_id}/comments`);
  const allComments = await getAllComments(request.params);
  response.status(200).json(allComments);
});

//getOneComment from post
posts.get("/:post_id/comments/:comment_id", async (request, response) => {
  console.log(
    `get request to /posts/${request.params.post_id}/comments/${request.params.comment_id}`
  );
  const oneComment = await getOneComment(request.params);
  response.status(200).json(oneComment);
});

// create newComment
posts.post("/:post_id/comments", async (request, response) => {
  console.log(`post request to /posts/${request.params.post_id}/comments`);
  // get post_id from params
  const { post_id } = request.params;
  // get username & comment from body
  const { username, comment } = request.body;
  //get the current date
  const date = new Date(Date.now()).toISOString();
  //use data to make new comment using query
  const newComment = await createComment(post_id, username, comment, date);
  //send the result to the user
  response.status(200).json(newComment);
});

//delete a comment
posts.delete("/:post_id/comments/:comment_id", async (request, response) => {
  console.log(
    `delete request to /posts/${request.params.post_id}/comments/${request.params.comment_id}`
  );
  const deletedComment = await deleteComment(request.params);
  response.status(200).json(deletedComment);
});

//get likes
//input: just post_id in the request params
//output: likes array length
posts.get("/:post_id/likes", async (request, response) => {
  console.log(`get likes for post ${request.params.post_id}`);
  const likesObject = await getLikes(request.params.post_id);
  response.status(200).json(likesObject.likes.length);
});

//add or remove likes as a post route
//input: post_id and username in the request params
//output: nothing for now
posts.post("/:post_id/likes/:username", async (request, response) => {
  const { post_id, username } = request.params;
  console.log(`Adjusting likes for post ${post_id}`);
  const newLikes = await postLike(post_id, username);
  //filler response, prob want to refresh/update like counter on the front
  response.status(200).json(newLikes);
});

//export router
module.exports = posts;
