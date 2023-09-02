import axios from "axios";
import { useEffect, useState } from "react";
import defaultImage from "../../../helpers/helperFunction";
import { Link } from "react-router-dom";
import "./ProfileDetails.css";
import AssociatedProject from "../../molecules/AssociatedProject/AssociatedProject";

const ProfileDetails = ({ username }) => {
  const API = process.env.REACT_APP_API_URL;
  const [user, setUser] = useState([]);
  const [associations, setAssociations] = useState([]);
  useEffect(() => {
    axios
      .get(`${API}users/${username}`)
      .then((response) => setUser(response.data))
      .catch((error) => console.warn(error));
    axios
      .get(`${API}connections/associated/${username}`)
      .then((response) => {
        setAssociations(
          response.data.filter(
            (association) => association.permissions !== "request"
          )
        );
      })
      .catch((error) => console.warn(error));
  }, [API, username]);

  return (
    <div className="ProfileDetails">
      <img src={user.profile_image || ""} alt="" onError={defaultImage} />
      <h2>{user.username}</h2>
      <p>{user.details}</p>
      {/* user resources */}
      {localStorage.getItem("credentials") === username ? (
        <Link to={`/profile/editProfile`}>
          <button>Edit Profile</button>
        </Link>
      ) : (
        <></>
      )}
      <div>
        {associations.map((association, i) => {
          return <AssociatedProject key={i} details={association} />;
        })}
      </div>
    </div>
  );
};

export default ProfileDetails;
