import React, { useState } from "react";
import { Tooltip, Button } from "@mui/material";
import { ClickAwayListener } from "@mui/material";
import { profileCircled } from "../../../assets/svgs";
import ProfileMenu from "../ProfileMenu/ProfileMenu";
import "./ProfileButton.scss";

const ProfileButton = () => {
  const [open, setOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 719);

  const updateMobile = () => {
    setIsMobile(window.innerWidth < 719);
  };
  const handleTipOpen = () => {
    setOpen(true);
  };
  const handleTipClose = () => {
    setOpen(false);
  };
  window.addEventListener("resize", updateMobile);

  const creds = localStorage.getItem("credentials");

  return !creds && isMobile ? null : (
    <ClickAwayListener onClickAway={handleTipClose}>
      <Tooltip
        arrow
        interactive
        open={open}
        disableFocusListener
        disableHoverListener
        disableTouchListener
        onClose={handleTipClose}
        title={<ProfileMenu />}
      >
        <Button
          disableRipple
          onClick={open ? handleTipClose : handleTipOpen}
          className="ProfileButton"
        >
          {profileCircled} <span>My Account</span>{" "}
        </Button>
      </Tooltip>
    </ClickAwayListener>
  );
};

export default ProfileButton;
