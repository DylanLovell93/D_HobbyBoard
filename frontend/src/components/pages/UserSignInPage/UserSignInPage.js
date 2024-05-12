import UserSignInForm from "../../molecules/UserSignInForm/UserSignInForm";
import NavBar from "../../organisms/NavBar/NavBar";
import { Typography } from "@mui/material";
import "./UserSignInPage.css";

function UserSignInPage() {
  const user = localStorage.getItem("credentials");
  return (
    <>
      <NavBar />
      <div className="UserSignInPage">
        {user ? (
          <p>Already signed in as "{user}"</p>
        ) : (
          <>
            <Typography variant="h4" className="signInTitle">
              Sign in to HobbyBoard
            </Typography>
            <UserSignInForm />
          </>
        )}
      </div>
    </>
  );
}

export default UserSignInPage;
