import { useNavigate } from "react-router-dom";
import TopBarM from "../TopBarM/TopBarM";
// import plus from "../../assets/circle-plus.svg";
// import profile from "../../assets/profile-circled.svg";
import {
  profileCircled,
  settings,
  signIn,
  signOut,
  home,
  circlePlus,
} from "../../../assets/svgs";
// import settings from "../../assets/settings.svg";
// import signIn from "../../assets/sign-in.svg";
// import signOut from "../../assets/sign-out.svg";
// import home from "../../assets/home.svg";
import "./NavBar.css";
const frontEndURL = process.env.REACT_APP_FRONT_END_URL;
const devFrontEnd = process.env.REACT_APP_DEV_FRONT_END;
const noNav = [
  frontEndURL,
  frontEndURL + "/",
  frontEndURL + "/signIn",
  frontEndURL + "/signup",
  devFrontEnd,
  devFrontEnd + "/",
  devFrontEnd + "/signIn",
  devFrontEnd + "/signup",
];
const homePaths = [
  devFrontEnd + "/projects",
  devFrontEnd + "/projects/",
  frontEndURL + "/projects",
  frontEndURL + "/projects/",
];
const createPaths = [
  devFrontEnd + "/projects/new",
  devFrontEnd + "/projects/new/",
  frontEndURL + "/projects/new",
  frontEndURL + "/projects/new/",
];

const NavBar = () => {
  const nav = useNavigate();

  const handleCreateProject = () => {
    nav("/projects/new");
  };

  const handleSignIn = () => {
    nav("/signIn");
  };

  const handleProfile = () => {
    nav("/profile");
  };

  const handleSignOut = () => {
    localStorage.removeItem("credentials");
    nav("/");
  };

  const handleProjects = () => {
    nav("/projects");
  };

  const currentLocation = window.location.href;
  console.log(currentLocation, homePaths);
  return (
    <>
      {noNav.includes(currentLocation) ? (
        ""
      ) : (
        <nav className="Nav">
          <TopBarM />
          {/* <img onClick={handleProfile} src={profile} alt="Profile" /> */}
          <div onClick={handleProfile}>{profileCircled}</div>
          {/* <img src={settings} alt="settings" /> */}
          <div className="setting">{settings}</div>
          {/* <img onClick={handleProjects} src={home} alt="home" /> */}
          <div
            className={
              homePaths.includes(currentLocation) ? "currentLocation" : ""
            }
            onClick={handleProjects}
          >
            {home}
          </div>
          {/* <img onClick={handleCreateProject} src={plus} alt="Add Project" /> */}
          <div
            className={
              createPaths.includes(currentLocation) ? "currentLocation" : ""
            }
            onClick={handleCreateProject}
          >
            {circlePlus}
          </div>
          {localStorage.getItem("credentials") ? (
            // <img onClick={handleSignOut} src={signOut} alt="Sign Out" />
            <div onClick={handleSignOut}>{signOut}</div>
          ) : (
            // <img onClick={handleSignIn} src={signIn} alt="Sign In" />
            <div onClick={handleSignIn}>{signIn}</div>
          )}
        </nav>
      )}
    </>
  );
};

export default NavBar;
