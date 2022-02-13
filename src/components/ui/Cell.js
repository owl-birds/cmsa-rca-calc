import classes from "./Cell.module.css";
import { useState, useEffect, useRef } from "react";
// REDUX STUFFS
import { useDispatch } from "react-redux";
// actions
import { editData } from "../../actions/data";
// import { EDIT_DATA } from "../../constants/actionTypes";
const Cell = ({ data, value, index, columnName }) => {
  //   VAR
  // FOR THE CELL ID IMPORTANT (UNIQUE)
  //   STATE
  const [isEditMode, setIsEditMode] = useState(false);
  //   REF
  const inputRef = useRef();
  // console.log(inputRef);
  // REDUX
  const dispatch = useDispatch();
  const clickToEditMode = () => setIsEditMode(() => true);
  const clickToReadMode = () => setIsEditMode(() => false);

  useEffect(() => {
    let isInEditPart = true;
    const clickOutsideInput = (event) => {
      // console.log(event.target.id);
      // console.log(event.target.nodeName);
      if (event.target.id !== String(index)) {
        if (inputRef.current) {
          // console.log(index);
          // console.log(columnName);
          // console.log(inputRef.current.value);
          if (inputRef.current.value === value) console.log("SAME VALUE");
          else {
            // dispatch({
            //   type: EDIT_DATA,
            //   index,
            //   columnName,
            //   editedValue: inputRef.current.value,
            // });

            // GOING INTO ACTIONS TO EDIT THE CELL
            const editedValue = inputRef.current.value;
            dispatch(editData(data, index, columnName, editedValue));
          }
        }
        clickToReadMode();
      }
    };
    if (isInEditPart) document.addEventListener("click", clickOutsideInput);
    // cleanup
    return () => {
      document.removeEventListener("click", clickOutsideInput);
      isInEditPart = false;
    };
  }, [columnName, index, dispatch, value, data]);
  return isEditMode ? (
    <input
      className={classes.cell}
      ref={inputRef}
      id={index}
      autoFocus
      defaultValue={value}
    />
  ) : (
    <div className={classes.cell} id={index} onClick={clickToEditMode}>
      {value}
    </div>
  );
};
export default Cell;
