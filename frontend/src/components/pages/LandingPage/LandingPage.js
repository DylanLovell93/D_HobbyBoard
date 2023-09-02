import { useNavigate } from "react-router-dom";
import logo from "../../../assets/landingLogo.svg";
import "./LandingPage.css";

function LandingPage() {
  const nav = useNavigate();
  const handleExplore = () => {
    nav("/projects");
  };
  const handleSignIn = () => {
    nav("/signIn");
  };
  const handleSignUp = () => {
    nav("/signup");
  };
  return (
    <div className="LandingPage">
      <img src={logo} alt="Hobby Board" />
      <button className="Explore" onClick={handleExplore}>
        Explore
      </button>
      <button className="SignIn" onClick={handleSignIn}>
        Sign In
      </button>
      <button className="NewAccount" onClick={handleSignUp}>
        New Account
      </button>
    </div>
  );
}

export default LandingPage;
