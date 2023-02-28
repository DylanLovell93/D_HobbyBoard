import axios from "axios";
import { useEffect, useState } from "react";
import Project from "../../molecules/Project/Project";
import "./Projects.css";

const Projects = (props) => {
  const API = process.env.REACT_APP_API_URL;
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    axios
      .get(API + "projects")
      .then((response) => setProjects(response.data))
      .catch((error) => console.warn(error));
  }, [API]);
  return (
    <div className="Projects">
      {projects.map((project, i) => {
        return <Project key={project.project_id} details={project} index={i} />;
      })}
    </div>
  );
};

export default Projects;
