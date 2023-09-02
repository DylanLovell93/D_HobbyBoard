import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import NewProjectPage from "./components/pages/NewProjectPage/NewProjectPage";
import ProjectsPage from "./components/pages/ProjectsPage/ProjectsPage";
import ProjectDetailsPage from "./components/pages/ProjectDetailsPage/ProjectDetailsPage";
import UserSignUpPage from "./components/pages/UserSignUpPage/UserSignUpPage";
import UserSignInPage from "./components/pages/UserSignInPage/UserSignInPage";
import ProfilePage from "./components/pages/ProfilePage/ProfilePage";
import EditProfilePage from "./components/pages/EditProfilePage/EditProfilePage";
import EditProjectPage from "./components/pages/EditProjectPage/EditProjectPage";
import NewPostPage from "./components/pages/NewPostPage/NewPostPage";
import { io } from "socket.io-client";
import LandingPage from "./components/pages/LandingPage/LandingPage";
const URL = process.env.REACT_APP_API_URL;
export const socket = io(URL, {
  query: {
    username: localStorage.getItem("credentials"),
  },
});

//test comment

function App() {
  const [res, setRes] = useState("Loading...");

  useEffect(() => {
    const testQuery = async () => {
      const response = await axios.get(URL);
      setRes(response.data);
    };

    testQuery();
  }, [URL]);

  return (
    <div className="App">
      <main>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route path="/signIn" element={<UserSignInPage />} />
          <Route path="/signup" element={<UserSignUpPage />} />
          <Route path="/projects" element={<ProjectsPage />} />
          <Route path="/projects/:pid" element={<ProjectDetailsPage />} />
          <Route path="/projects/:pid/edit" element={<EditProjectPage />} />
          <Route path="/projects/:pid/newPost" element={<NewPostPage />} />
          <Route path="/projects/new" element={<NewProjectPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/profile/:username" element={<ProfilePage />} />
          <Route path="/profile/editProfile" element={<EditProfilePage />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
