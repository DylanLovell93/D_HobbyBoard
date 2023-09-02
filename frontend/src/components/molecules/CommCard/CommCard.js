import React from "react";
import { Link } from "react-router-dom";
import defaultImage from "../../../helpers/helperFunction";
import axios from "axios";
import "./CommCard.css";

const CommCard = ({
  creator,
  trigReset,
  commInfo: { post_id, comment_id, username, comment, date, profile_image },
  last,
}) => {
  const URL = process.env.REACT_APP_API_URL;
  const user = localStorage.getItem("credentials");
  const formattedDate = new Date(date).toLocaleDateString();

  const handleDelete = () => {
    if (
      window.confirm("Are you sure that you'd like to delete this comment?")
    ) {
      axios
        .delete(`${URL}posts/${post_id}/comments/${comment_id}`)
        .then(trigReset)
        .catch((error) => console.warn(error));
    }
  };

  return (
    <div className={"CommCard" + (last ? " lastComm" : "")}>
      <img
        className="pfp"
        src={profile_image || ""}
        onError={defaultImage}
        alt={username + "'s profile image"}
      />
      <div className="commentContent">
        <h4>
          <Link to={`/profile/${username}`}>{username}</Link>{" "}
          <span className="commDate">({formattedDate})</span>
        </h4>
        <p>{comment}</p>
      </div>
      {(user === creator || user === username) && (
        <button className="commDelete" onClick={handleDelete}>
          X
        </button>
      )}
    </div>
  );
};

export default CommCard;
