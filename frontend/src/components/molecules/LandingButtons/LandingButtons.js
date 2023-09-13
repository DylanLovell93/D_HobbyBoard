import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@mui/material";
import "./LandingButtons.scss";

const LandingButtons = ({ desktop = false }) => {
  const creds = localStorage.getItem("credentials");
  const [loggedIn, setLoggedIn] = useState(creds ? true : false);
  const handleSignOut = () => {
    localStorage.removeItem("credentials");
    setLoggedIn(false);
  };

  return (
    <div className={"LandingButtons" + (desktop ? " desktop" : "")}>
      <Button
        className="ExploreBttn"
        component={Link}
        to="/projects"
        variant="outlined"
        color="primary"
      >
        Explore
      </Button>
      {loggedIn ? (
        <>
          <Button
            className="My Profile"
            component={Link}
            to="/profile"
            variant="outlined"
            color="success"
          >
            My Profile
          </Button>
          <Button
            className="SignOutBttn"
            component={Link}
            to="/"
            onClick={handleSignOut}
            variant="outlined"
            color="error"
          >
            Sign Out
          </Button>
        </>
      ) : (
        <>
          <Button
            className="SignInBttn"
            component={Link}
            to="/signin"
            variant="outlined"
            color="success"
          >
            Sign In
          </Button>
          <Button
            className="SignUpBttn"
            component={Link}
            to="/signup"
            variant="outlined"
            color="error"
          >
            Sign Up
          </Button>
        </>
      )}
    </div>
  );
};

export default LandingButtons;
