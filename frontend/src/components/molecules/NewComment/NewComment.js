import { useState } from "react";
import axios from "axios";
import "./NewComment.css";
const NewComment = ({ post_id, trigReset }) => {
  const [comment, setComment] = useState("");
  const URL = process.env.REACT_APP_API_URL;
  const handleChange = (event) => {
    setComment(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const username = localStorage.getItem("credentials");
    axios
      .post(`${URL}posts/${post_id}/comments`, {
        username,
        comment,
      })
      .then((_) => {
        trigReset();
        setComment("");
      });
  };
  return (
    <form className="NewComment" onSubmit={handleSubmit}>
      <input
        type="text"
        id="comment"
        placeholder="Write your comment..."
        value={comment}
        onChange={handleChange}
      ></input>
      {comment ? (
        <button type="submit" id="commentSubmit">
          &#9654;
        </button>
      ) : null}
    </form>
  );
};

export default NewComment;
