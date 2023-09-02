import EditProjectForm from "../../molecules/EditProjectForm/EditProjectForm";
import NavBar from "../../organisms/NavBar/NavBar";
import "./EditProjectPage.css";

function EditProjectPage() {
  return (
    <>
    <NavBar />
    <div className="EditProjectPage">
      <EditProjectForm />
    </div>
    </>
  );
}

export default EditProjectPage;
