import { Typography } from "@mui/material";
import logo from "../../../assets/landingLogo.svg";
import LandingButtons from "../../molecules/LandingButtons/LandingButtons";
import "./LandingPage.scss";

function LandingPage() {
  return (
    <div className="LandingPage">
      <LandingButtons desktop />
      <img src={logo} alt="Hobby Board" />
      <Typography variant="h4"> Where Creativity meets Community!</Typography>
      <LandingButtons />
    </div>
  );
}

export default LandingPage;
