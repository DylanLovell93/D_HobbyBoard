import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./EditProfileForm.css";

const EditProfileForm = ({ username }) => {
  const navigator = useNavigate();
  const API = process.env.REACT_APP_API_URL;
  const [user, setUser] = useState({
    username: "",
    password: "",
    email: "",
    details: "",
    profile_image: "",
  });

  useEffect(() => {
    axios
      .get(`${API}users/${username}`)
      .then((response) => setUser(response.data));
  }, [API, username]);

  const handleChange = (event) => {
    setUser({
      ...user,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`${API}users/${username}`, user)
      .then(() => navigator(`/profile`));
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="edit-image-input">
        <label htmlFor="profile_image">Image:</label>
        <input
          id="profile_image"
          type="text"
          value={user.profile_image || ""}
          onChange={handleChange}
        />
      </div>
      <div className="edit-username-input">
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          type="text"
          value={user.username}
          onChange={handleChange}
          required
        />
      </div>
      <div className="edit-password-input">
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          type="text"
          value={user.password}
          onChange={handleChange}
          required
        />
      </div>
      <div className="edit-email-input">
        <label htmlFor="email">Email:</label>
        <input
          id="email"
          type="text"
          value={user.email}
          onChange={handleChange}
        />
      </div>
      <div className="edit-details-input">
        <label htmlFor="details">Details:</label>
        <input
          id="details"
          type="text"
          value={user.details}
          onChange={handleChange}
        />
      </div>
      <input type="submit" />
    </form>
  );
};

export default EditProfileForm;
