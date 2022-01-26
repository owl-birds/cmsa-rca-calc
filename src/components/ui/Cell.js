import classes from "./Cell.module.css";
import { useState, useEffect, useRef } from "react";
const Cell = (props) => {
  //   console.log("CELL RENDERING");
  //   VAR
  // FOR THE CELL ID IMPORTANT (UNIQUE)
  //   STATE
  const [isEditMode, setIsEditMode] = useState(false);
  //   REF
  const inputRef = useRef();
  const clickToEditMode = () => setIsEditMode(() => true);
  const clickToReadMode = () => setIsEditMode(() => false);
  const clickOutsideInput = (event) => {
    // console.log(event.target.id);
    // console.log(event.target.nodeName);
    if (event.target.id !== "2") {
      clickToReadMode();
    }
  };
  useEffect(() => {
    document.addEventListener("click", clickOutsideInput);
    // cleanup
    return document.addEventListener("click", clickOutsideInput);
  }, []);
  return isEditMode ? (
    <input ref={inputRef} id={"2"} />
  ) : (
    <div id={"2"} onClick={clickToEditMode}>
      {props.children}
    </div>
  );
};
export default Cell;
