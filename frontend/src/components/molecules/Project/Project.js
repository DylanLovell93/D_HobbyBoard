import { Link } from "react-router-dom";
import defaultImage from "../../../helpers/helperFunction";
import { useState, useEffect } from "react";
import "./Project.css";

const Project = (props) => {
  const [show, setShow] = useState("hidden");

  useEffect(() => {
    const timer = setInterval(() => {
      if (show === "hidden") {
        setShow("show");
      }
    }, props.index * 250);

    return () => clearInterval(timer);
  });
  // console.log(props);
  return (
    <Link to={`/projects/${props.details.project_id}`}>
      <div
        style={{ animationDelay: props.index / 4 + "s" }}
        className={"Project " + show}
      >
        <img
          src={props.details.project_image || ""}
          alt=""
          onError={defaultImage}
        />
        <div className="projectContent">
          <h3>{props.details.name}</h3>
          <p>{props.details.details}</p>
          <div className="readWrap">
            <button>Read More</button>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Project;
