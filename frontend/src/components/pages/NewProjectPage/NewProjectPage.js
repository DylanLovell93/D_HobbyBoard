import NewProjectForm from "../../molecules/NewProjectForm/NewProjectForm";
import NavBar from "../../organisms/NavBar/NavBar";
import "./NewProjectPage.css";

const NewProjectPage = () => {
  return (
    <>
    <NavBar />
    <div className="NewProjectPage">
      {localStorage.getItem("credentials") ? (
        <NewProjectForm />
        ) : (
          <p>Please Sign in to create a project!</p>
          )}
    </div>
    </>
  );
};

export default NewProjectPage;
