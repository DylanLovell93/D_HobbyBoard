import "./ConnModal.css";
import { useState, useEffect } from "react";
import { hoistCollabCard } from "../../../helpers/helperFunction";
import ModalCard from "../../molecules/ModalCard/ModalCard.js";
import axios from "axios";
import { socket } from "../../../App.js";

//input project_id(number), setDisplay(state function)}
const ConnModal = ({ project_id, setDisplay, owner, pageReload }) => {
  const [conns, setConns] = useState([]);
  const [requestView, setView] = useState(false);
  const [reload, setReload] = useState(false);
  const user = localStorage.getItem("credentials");
  const isOwner = user === owner;
  const collaborators = hoistCollabCard(
    conns.filter(
      (e) => e.permissions === "collaborator" || e.permissions === "owner"
    )
  );
  const requesters = conns.filter((e) => e.permissions === "request");
  const URL = process.env.REACT_APP_API_URL;
  const listenForRequests = () => {
    socket.off().on("request" + project_id, modalReload);
    console.log("ran");
  };

  useEffect(() => {
    axios
      .get(`${URL}connections/${project_id}`)
      .then((res) => setConns(res.data));

    listenForRequests();

    return () => {
      socket.off();
    };
  }, [URL, project_id, reload]);

  const modalReload = () => {
    setReload(!reload);
  };

  const handleCollab = () => {
    setView(false);
  };
  const handleRequest = () => {
    setView(true);
  };

  const modalTitle = <p className="modTitle">Connections</p>;
  const colBttn = (
    <button
      className={isOwner ? "tabBttn colBttn" : "tabBttn colBttn norm"}
      onClick={handleCollab}
    >
      Collaborators
    </button>
  );
  const reqBttn = (
    <button className="tabBttn reqBttn" onClick={handleRequest}>
      Request
    </button>
  );
  const xBttn = (
    <button className="xBttn" onClick={setDisplay}>
      X
    </button>
  );
  const collabCards = collaborators.map((e, i) => (
    <ModalCard
      conInfo={e}
      owner={owner}
      modalReload={modalReload}
      pageReload={pageReload}
      closeModal={setDisplay}
      key={"c" + i}
      last={i === collaborators.length - 1}
    />
  ));
  const requestCards = requesters.map((e, i) => (
    <ModalCard
      conInfo={e}
      owner={owner}
      modalReload={modalReload}
      key={"r" + i}
      last={i === requesters.length - 1}
    />
  ));

  return (
    <div className="ConnModal">
      <div className="darkScreen" onClick={setDisplay}></div>
      <div className="modalContent">
        <div className="modalRow mRow1">
          {modalTitle}
          {xBttn}
        </div>
        <div className="modalRow mRow2">
          {colBttn}
          {isOwner && reqBttn}
        </div>
        <div
          className={"modalRow mRow3" + (requestView ? " reqView" : " conView")}
        >
          {requestView ? requestCards : collabCards}
        </div>
      </div>
    </div>
  );
};

export default ConnModal;
