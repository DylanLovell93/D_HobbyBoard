import EditProfileForm from "../../molecules/EditProfileForm/EditProfileForm";
import "./EditProfilePage.css";

const EditProfilePage = () => {
  const user = localStorage.getItem("credentials");
  return (
    <div className="EditProfile">
      <EditProfileForm username={user} />
    </div>
  );
};

export default EditProfilePage;
