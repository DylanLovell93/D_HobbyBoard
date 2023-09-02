import Projects from "../../organisms/Projects/Projects";
import NavBar from "../../organisms/NavBar/NavBar";
import "./ProjectsPage.css";

const ProjectsPage = () => {
  return (
    <>
    <NavBar />
    <div className="ProjectsPage">
      <Projects />
    </div>
    </>
  );
};

export default ProjectsPage;
