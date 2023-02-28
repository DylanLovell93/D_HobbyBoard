import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./EditProjectForm.css"

const EditProjectForm = () => {
  const { pid } = useParams();
  const navigator = useNavigate();
  const API = process.env.REACT_APP_API_URL;
  const [project, setProject] = useState({
    name: "",
    details: "",
    project_image: "",
    archived: false,
  });

  useEffect(() => {
    axios
      .get(`${API}projects/${pid}`)
      .then((response) => setProject(response.data));
  }, [API, pid]);

  const handleChange = (event) => {
    setProject({
      ...project,
      [event.target.id]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .put(`${API}projects/${pid}`, project)
      .then(() => navigator(`/projects/${pid}`));
  };

  return (
      <form onSubmit={handleSubmit}>
        <div className="project-name-input">
          <label htmlFor="name">Project Name</label>
        <input
          id="name"
          type="text"
          value={project.name}
          onChange={handleChange}
          required
        />
        </div>
        <div className="project-details-input">
          <label htmlFor="details">Description</label>
          <textarea
            id="details"
            type="text"
            value={project.details}
            onChange={handleChange}
            required
          />
        </div>
        <div className="project-image-input">
          <label htmlFor="project_image">Image</label>
          <input
            id="project_image"
            type="text"
            value={project.project_image || ""}
            onChange={handleChange}
          />
        </div>
        
        <input type="submit" />
      </form>
  );
};

export default EditProjectForm;
