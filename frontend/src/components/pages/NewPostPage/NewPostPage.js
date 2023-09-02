import React from "react";
import NewPostForm from "../../molecules/NewPostForm/NewPostForm";
import NavBar from "../../organisms/NavBar/NavBar";
import "./NewPostPage.css";

const NewPostPage = () => {
  return (
    <>
    <NavBar />
    <div className="NewPostPage">
      <NewPostForm />
    </div>
    </>
  );
};

export default NewPostPage;
