import classes from "./DropFileInput.module.css";

// dispatch
import { useDispatch } from "react-redux";
// actions
import { parseCsv } from "../../actions/data";

const DropFileInput = () => {
  const dispatch = useDispatch();
  const dropZoneOver = (event) => {
    event.preventDefault();
    event.target.classList.add(classes.dropZoneOver);
  };
  const dropZoneLeave = (event) => {
    event.target.classList.toggle(classes.dropZoneOver);
  };
  const dropHandler = (event) => {
    event.preventDefault();
    updateLabel(event.dataTransfer.files);
  };
  const dropZoneClickhandler = () => {
    const input = document.querySelector("#uploadedFile");
    input.click();
  };
  const inputChangeHandler = () => {
    const input = document.querySelector("#uploadedFile");
    const dropZone = document.querySelector(".drop-zone");
    dropZone.classList.add(classes.dropZoneOver);
    updateLabel(input.files);
  };
  const updateLabel = (files) => {
    const label = document.querySelector("#label");
    const input = document.querySelector("#uploadedFile");
    input.files = files;
    label.innerText = files[0].name;
  };
  // UPLOAD
  const buttonClickHandler = async () => {
    const input = document.querySelector("#uploadedFile");
    // console.log(input.files);
    const data = await window.api.readCSV(input.files[0].path);
    // console.log(data);
    dispatch(parseCsv(data));
  };
  return (
    <div className={classes.dropZoneWrapper}>
      <div
        className={`drop-zone ${classes.dropZone}`}
        onDragOver={dropZoneOver}
        onDragLeave={dropZoneLeave}
        onDrop={dropHandler}
        onClick={dropZoneClickhandler}
      >
        <span id="label">Drop Ur File Here to Upload</span>
        <input
          type="file"
          className={classes.dropZoneInput}
          name="uploadedFile"
          id="uploadedFile"
          onChange={inputChangeHandler}
        />
      </div>
      <button onClick={buttonClickHandler} className={classes.btn}>
        UPLOAD
      </button>
    </div>
  );
};
export default DropFileInput;
