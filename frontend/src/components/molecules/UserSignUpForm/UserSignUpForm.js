import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./UserSignUpForm.css";

function UserSignupForm() {
  const API = process.env.REACT_APP_API_URL;
  const nav = useNavigate();
  const [userInfo, setUserInfo] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleInputChange = (event) => {
    setUserInfo({ ...userInfo, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const today = new Date();
    const [year, month, day] = [
      today.getFullYear(),
      today.getMonth(),
      today.getDay(),
    ];
    //axios post userInfo
    axios
      .post(API + "users/", {
        ...userInfo,
        date: year + "-" + month + "-" + day,
      })
      .then(() => {
        nav("/signIn");
      })
      .catch(console.log);
  };

  return (
    <form className="UserSignupForm" onChange={handleInputChange}>
      <>
        <div className="username-input">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            name="username"
            type="text"
            value={userInfo.username}
            onChange={handleInputChange}
            placeholder="Username"
            required
          />
        </div>
        <div className="email-input">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            value={userInfo.email}
            onChange={handleInputChange}
            placeholder="Email"
            required
          />
        </div>
        <div className="password-input">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            name="password"
            type="text"
            value={userInfo.password}
            onChange={handleInputChange}
            placeholder="Password"
            required
          />
        </div>
        <div className="password-input">
          <label htmlFor="confirm-password">Confirm password</label>
          <input
            id="confirm-password"
            name="confirmPassword"
            type="text"
            value={userInfo.confirmUsername}
            onChange={handleInputChange}
            placeholder="Confirm Password"
            required
          />
        </div>
        <input className="button2" onClick={handleSubmit} type="submit" />
      </>
    </form>
  );
}

export default UserSignupForm;
