import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import { useState, useEffect } from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import New from './pages/New';
import AllProjects from './pages/AllProjects';
import ProjectDetails from './pages/ProjectDetails';
import NavBar from './components/common/NavBar';
import TopBarM from './components/common/TopBarM';
import UserSignup from './pages/UserSignup';
import UserSignIn from './pages/UserSignIn';
import Profile from './pages/Profile';
import EditProfilePage from './pages/EditProfilePage';
import EditProjectPage from './pages/EditProjectPage';
import NewPostPage from './pages/NewPostPage';
import { io } from 'socket.io-client';
import LandingPage from './pages/LandingPage';
const URL = process.env.REACT_APP_API_URL;
export const socket = io(URL, {
  query: {
    username: localStorage.getItem('credentials'),
  },
});

//test comment

function App() {
  const [res, setRes] = useState('Loading...');

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
        <TopBarM />
        <Routes>
          <Route
            exact
            path="/"
            element={
              // <header className="App-header">
              //   <Link to="/projects">
              //     <p>All Project</p>
              //   </Link>
              //   <img src={logo} className="App-logo" alt="logo" />
              //   <p>Here is our database call = {res}</p>
              // </header>
              <LandingPage />
            }
          />
          <Route path="/signIn" element={<UserSignIn />} />
          <Route path="/signup" element={<UserSignup />} />
          <Route path="/projects" element={<AllProjects />} />
          <Route path="/projects/:pid" element={<ProjectDetails />} />
          <Route path="/projects/:pid/edit" element={<EditProjectPage />} />
          <Route path="/projects/:pid/newPost" element={<NewPostPage />} />
          <Route path="/projects/new" element={<New />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:username" element={<Profile />} />
          <Route path="/profile/editProfile" element={<EditProfilePage />} />
        </Routes>
        <NavBar />
      </main>
    </div>
  );
}

export default App;
