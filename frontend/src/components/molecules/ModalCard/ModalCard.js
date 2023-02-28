import "./ModalCard.css";
import { Link } from "react-router-dom";
import axios from "axios";
import defaultImage from "../../../helpers/helperFunction";
const ModalCard = ({
  conInfo: { username, project_id, permissions, profile_image },
  owner,
  modalReload,
  pageReload,
  closeModal,
  last,
}) => {
  const URL = process.env.REACT_APP_API_URL;
  const user = localStorage.getItem("credentials");

  const handleRemoveCollaborator = () => {
    if (
      window.confirm(
        username === user
          ? "Are you sure that you want to leave?"
          : "Are you sure you want to kick contributor?"
      )
    ) {
      axios
        .delete(`${URL}connections/${username}`, { data: { project_id } })
        .then((_) => {
          if (username === user) {
            pageReload();
            closeModal();
          } else {
            modalReload();
          }
        });
    }
  };

  const handleDenyRequest = () => {
    if (window.confirm("Are you sure you want to deny acceptance?")) {
      axios
        .delete(`${URL}connections`, { data: { username, project_id } })
        .then((_) => modalReload());
    }
  };

  const handleAcceptRequest = () => {
    if (window.confirm("Confirm acceptance.")) {
      axios
        .put(`${URL}connections`, {
          username,
          project_id,
        })
        .then((_) => modalReload());
    }
  };

  const cardClass =
    "ModalCard" +
    (permissions === "request" ? " reqCard" : " colCard") +
    (last ? " last" : "");

  return (
    <div className={cardClass}>
      <img
        src={profile_image || ""}
        alt=""
        onError={defaultImage}
        className="pfp"
      ></img>
      <div className="cardName">
        <p>
          <Link to={`/profile/${username}`}>{username}</Link>
        </p>
        {permissions === "request" && (
          <>
            <button onClick={handleAcceptRequest} className="add">
              Accept
            </button>{" "}
            <button onClick={handleDenyRequest} className="remove">
              Deny
            </button>
          </>
        )}
      </div>
      {permissions !== "request" && (username === user || user === owner) && (
        <button onClick={handleRemoveCollaborator} className="remove">
          {username === user ? "Leave" : "Kick"}
        </button>
      )}
    </div>
  );
};

export default ModalCard;
