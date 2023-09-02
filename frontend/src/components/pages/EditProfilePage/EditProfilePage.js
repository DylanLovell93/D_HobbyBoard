import EditProfileForm from "../../molecules/EditProfileForm/EditProfileForm";
import NavBar from "../../organisms/NavBar/NavBar";
import "./EditProfilePage.css";

const EditProfilePage = () => {
  const user = localStorage.getItem("credentials");
  return (
    <>
    <NavBar />
    <div className="EditProfile">
      <EditProfileForm username={user} />
    </div>
    </>
  );
};

export default EditProfilePage;
