import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const NewPostForm = () => {
  const [project, setProject] = useState({});
  const [newPost, setNewPost] = useState({
    title: "",
    contents: "",
    members_only: false,
  });
  const username = localStorage.getItem("credentials");
  //to prevent CI errors, use later to conditional render
  console.log(project, username);
  const URL = process.env.REACT_APP_API_URL;
  const { pid } = useParams();
  const nav = useNavigate();

  const handleChange = (event) => {
    event.target.id === "members_only"
      ? setNewPost({
          ...newPost,
          members_only: !newPost.members_only,
        })
      : setNewPost({
          ...newPost,
          [event.target.id]: event.target.value,
        });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios
      .post(`${URL}projects/${pid}/posts`, newPost)
      .then(() => nav(`/projects/${pid}`));
  };

  useEffect(() => {
    axios.get(`${URL}projects/${pid}`).then((res) => setProject(res.data));
  }, [URL, pid]);

  return (
    <form onSubmit={handleSubmit}>
      <div className="title-input">
        <label htmlFor="title">Post Title</label>
        <input
          id="title"
          type="text"
          value={newPost.title}
          onChange={handleChange}
          required
        />
      </div>
      <div className="contents-input">
        <label htmlFor="contents">Post Content</label>
        <textarea
          id="contents"
          type="text"
          value={newPost.contents}
          onChange={handleChange}
          required
        />
      </div>
      <div className="members-input">
        <label htmlFor="members_only">Members Only?</label>
        <input
          id="members_only"
          type="checkbox"
          checked={newPost.members_only}
          onChange={handleChange}
        />
      </div>

      <input type="submit" />
    </form>
  );
};

export default NewPostForm;
