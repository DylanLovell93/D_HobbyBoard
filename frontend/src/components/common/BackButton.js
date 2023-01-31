import { useNavigate } from "react-router-dom";
import arrowBackCircle from "../../assets/svgs.js";
// import backButton from "../../assets/arrow-back-circle.svg"

function BackButton() {
  const history = useNavigate();
  return (
    // <img onClick={()=> history(-1)} className="back-button" src={backButton} alt="Go back one page"/>
    <div className="backButton" onClick={() => history(-1)}>
      {arrowBackCircle}
    </div>
  );
}

export default BackButton;
