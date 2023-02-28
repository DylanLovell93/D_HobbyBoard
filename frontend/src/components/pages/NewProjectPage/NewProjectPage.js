import NewProjectForm from "../../molecules/NewProjectForm/NewProjectForm";
import "./NewProjectPage.css";

const NewProjectPage = () => {
  return (
    <div className="NewProjectPage">
      {localStorage.getItem("credentials") ? (
        <NewProjectForm />
      ) : (
        <p>Please Sign in to create a project!</p>
      )}
    </div>
  );
};

export default NewProjectPage;
