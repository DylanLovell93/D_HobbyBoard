import UserSignUpForm from "../../molecules/UserSignUpForm/UserSignUpForm";
import "./UserSignUpPage.css";

function UserSignUpPage() {
  const user = localStorage.getItem("credentials");
  return (
    <div className="UserSignUpPage">
      {user ? <p>Already signed in as "{user}"</p> : <UserSignUpForm />}
    </div>
  );
}

export default UserSignUpPage;
