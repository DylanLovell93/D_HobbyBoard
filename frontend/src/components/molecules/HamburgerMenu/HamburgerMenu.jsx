import React from "react";
import { Link } from "react-router-dom";
import { Typography, Modal } from "@mui/material";
import "./HamburgerMenu.scss";

const HamburgerMenu = ({ open, onClose }) => {
  const creds = localStorage.getItem("credentials");

  return (
    <Modal open={open} onClose={onClose}>
      <div className="HamburgerMenu">
        {!creds && (
          <>
            <Link to="/signin">
              <div className="MenuItem SignIn">
                <Typography variant="h5">Sign In</Typography>
              </div>
            </Link>
            <Link to="/signup">
              <div className="MenuItem SignUp">
                <Typography variant="h5">Sign Up</Typography>
              </div>
            </Link>
          </>
        )}
        <Link to="/projects">
          <div className="MenuItem">
            <Typography variant="h5">Browse</Typography>
          </div>
        </Link>
        {creds && (
          <Link to="/projects/new">
            <div className="MenuItem">
              <Typography variant="h5">New Project</Typography>
            </div>
          </Link>
        )}
      </div>
    </Modal>
  );
};

export default HamburgerMenu;
