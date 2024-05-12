import { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./UserSignInForm.scss";
import { Button, TextField } from "@mui/material";
import { textFieldSx } from "../../styles/muiStyles";

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
    <form className="UserSignInForm" onSubmit={handleSubmit}>
      <div className="credInput">
        <div className="usernameInput">
          <TextField
            id="username"
            name="username"
            type="text"
            label="Username"
            variant="outlined"
            required
            fullWidth
            sx={textFieldSx}
            onChange={handleInputChange}
            value={signInCred.username}
          />
        </div>
        <div className="passwordInput">
          <TextField
            id="password"
            name="password"
            type="password"
            label="Password"
            variant="outlined"
            required
            fullWidth
            sx={textFieldSx}
            onChange={handleInputChange}
            value={signInCred.password}
          />
        </div>
      </div>

      <div className="formBttns">
        <Button
          className="SignInBttn formBttn"
          variant="outlined"
          type="submit"
          fullWidth
        >
          Sign In
        </Button>

        <Button
          className="SignUpBttn formBttn"
          component={Link}
          to="/signup"
          variant="outlined"
          color="success"
          fullWidth
        >
          Create New Account
        </Button>
      </div>
    </form>
  );
}

export default UserSignInForm;
