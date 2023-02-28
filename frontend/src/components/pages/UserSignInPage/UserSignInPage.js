import UserSignInForm from "../../molecules/UserSignInForm/UserSignInForm";
import "./UserSignInPage.css";

function UserSignInPage() {
  const user = localStorage.getItem("credentials");
  return (
    <div className="UserSignInPage">
      {user ? <p>Already signed in as "{user}"</p> : <UserSignInForm />}
    </div>
  );
}

export default UserSignInPage;
