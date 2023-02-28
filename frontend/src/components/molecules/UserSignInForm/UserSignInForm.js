import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./UserSignInForm.css";

function UserSignInForm() {
  const API = process.env.REACT_APP_API_URL;
  const nav = useNavigate();
  const [signInCred, setSignInCred] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (event) => {
    setSignInCred({ ...signInCred, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    //axios get user, if no user found show alert message
    axios
      .post(API + "users/signin", signInCred)
      .then((response) => {
        console.log(response.data);
        // document.cookie = "credentials="+response.data
        localStorage.setItem("credentials", response.data);
        nav("/projects");
      })
      .catch(() => {
        alert("Invalid Username/Password");
      });
  };
  return (
    <form
      className="UserSignInForm"
      onSubmit={handleSubmit}
      onChange={handleInputChange}
    >
      <div className="username-input">
        <label htmlFor="username">Username</label>
        <input
          id="username"
          name="username"
          type="text"
          placeholder="username"
          required
        />
      </div>
      <div className="password-input">
        <label htmlFor="password">Password</label>
        <input
          id="password"
          name="password"
          type="text"
          placeholder="password"
          required
        />
      </div>

      <input type="submit" className="button" />
      <div>
        <button className="button2">
          <Link to="/signup">Sign Up</Link>
        </button>
      </div>
    </form>
  );
}

export default UserSignInForm;
