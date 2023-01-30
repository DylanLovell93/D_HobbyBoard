//import image to default to
import noImage from "../assets/noimage.png";

// function for default image;
export default function defaultImage(event) {
  event.target.src = noImage;
}

//function for hoisting collaborator to the top
export function hoistCollabCard(collabs) {
  const user = document.cookie.split("=")[1];
  const userPosition = collabs.findIndex((e) => e.username === user);
  // if the user doesn't exist in our array, return the original array, else hoist their name to the top.
  return userPosition === -1
    ? collabs
    : collabs.splice(userPosition, 1).concat(collabs);
}
