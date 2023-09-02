import { useParams } from "react-router-dom";
import ProfileDetails from "../../organisms/ProfileDetails/ProfileDetails";
import NavBar from "../../organisms/NavBar/NavBar";
import "./ProfilePage.css";

const ProfilePage = () => {
  //fetch username from cookies
  let user = localStorage.getItem("credentials");
  let { username } = useParams();
  if (username) {
    user = username;
  }

  //pass in username to ProfileDetails

  return (
    <>
    <NavBar />
    <div className="Profile">
      {!localStorage.getItem("credentials") && !username ? (
        <p>Please sign in to view your profile!</p>
        ) : (
          <ProfileDetails username={user} />
          )}
    </div>
    </>
  );
};

export default ProfilePage;
