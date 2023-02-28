//import css
import "./TopBarM.css";

//import back button
import BackButton from "../../atoms/BackButton/BackButton.js";

//import useNavigate
import { useNavigate } from "react-router-dom";

//import defaultImage

import { logoSmall } from "../../../assets/svgs";
const frontEndURL = process.env.REACT_APP_FRONT_END_URL;
const devFrontEnd = process.env.REACT_APP_DEV_FRONT_END;
const noNav = [frontEndURL, frontEndURL + "/", devFrontEnd, devFrontEnd + "/"];

const TopBarM = () => {
  //set variable for navigate
  const nav = useNavigate();

  //create function to handle home logo
  const handleHome = () => {
    nav("/");
  };

  return (
    <>
      {noNav.includes(window.location.href) ? (
        ""
      ) : (
        <div className="TopBarM">
          <BackButton />
          <div className="topLogo" onClick={handleHome}>
            {logoSmall}
          </div>
        </div>
      )}
    </>
  );
};

//export our component
export default TopBarM;
