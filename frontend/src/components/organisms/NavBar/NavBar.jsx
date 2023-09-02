import { Link } from "react-router-dom";
import { Button, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { logoSmall, profileCircled } from "../../../assets/svgs";
import NavHamburger from "../../molecules/NavHamburger/NavHamburger";
import ProfileButton from "../../molecules/ProfileButton/ProfileButton";
import "./NavBar.scss";

const NavBar = () => {
  return (
    <nav className="Nav">
      <div className="leftLinks">
        <IconButton className="navLogo" component={Link} to="/" disableRipple>
          {logoSmall}
        </IconButton>
        <div className="desktopLinks">
          <Button component={Link} to="/projects">
            {" "}
            Browse{" "}
          </Button>
          {localStorage.getItem("credentials") && (
            <Button component={Link} to="/projects/new">
              {" "}
              New Project{" "}
            </Button>
          )}
        </div>
      </div>
      <div className="rightLinks">
        <IconButton component={Link} to="/search" disableRipple disabled>
          <SearchIcon />
        </IconButton>
        {/* {localStorage.getItem("credentials") && 
              <IconButton component={Link} to='/profile' disableRipple>
                {profileCircled}
              </IconButton>
            } */}
        <ProfileButton />
        <NavHamburger />
      </div>
    </nav>
  );
};

export default NavBar;
