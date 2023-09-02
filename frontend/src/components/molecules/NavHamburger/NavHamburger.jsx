import { useState } from "react";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import HamburgerMenu from "../HamburgerMenu/HamburgerMenu";
import "./NavHamburger.scss";

const NavHamburger = () => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button
        onClick={open ? handleClose : handleOpen}
        className="NavHamburger"
        disableRipple
      >
        {!open ? <MenuIcon /> : <CloseIcon />}
      </Button>
      <HamburgerMenu open={open} onClose={handleClose} />
    </>
  );
};

export default NavHamburger;
