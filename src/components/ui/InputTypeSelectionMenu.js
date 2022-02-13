import classes from "./InputTypeSelectionMenu.module.css";
import { useState } from "react";
import { useDispatch } from "react-redux";
// REDUX STUFFS
import { SELF_INPUT_DATA } from "../../constants/actionTypes";
// COMPONENTS
import DropFileInput from "./DropFileInput";
import Table from "./Table";
const InputTypeSelectionMenu = ({ cmsaType }) => {
  // REDUX STUFFS
  const dispatch = useDispatch();
  const [isMenu, setIsMenu] = useState(true);
  const [isSelf, setIsSelf] = useState(false);
  console.log("selection menu rendering");
  // func related to state
  const setMenu = (value = true) => {
    setIsMenu(() => value);
  };
  const setInputType = (value = false) => {
    setIsSelf(() => value);
  };
  const fileInput = () => {
    setMenu(false);
    setInputType(false);
  };
  const selfInput = () => {
    dispatch({ type: SELF_INPUT_DATA, cmsaType });
    setMenu(false);
    setInputType(true);
  };
  return (
    <section className={classes.selectionMenuBox}>
      {isMenu ? (
        <div className={classes.buttonsBox}>
          <button onClick={() => fileInput()}>Input with .CSV file</button>
          <button onClick={() => selfInput()}>Self Input</button>
        </div>
      ) : isSelf ? (
        <h1>SIKE</h1>
      ) : (
        <DropFileInput />
      )}
    </section>
  );
};
export default InputTypeSelectionMenu;
