import classes from "./OneLevelMenu.module.css";
//
import { useRef, useState } from "react";
// REDUX
import { useDispatch } from "react-redux";
// ... reudx constant
import { OPTIONS_UI_ONE_LEVEL } from "../../constants/actionTypes";
// components
import Select from "./Select";
const OneLevelMenu = ({ yearList }) => {
  // REF
  const firstYearRef = useRef();
  const secondYearRef = useRef();
  // REDUX STUFFS
  const dispatch = useDispatch();
  // STATE
  const [firstYear, setFirstYear] = useState(yearList);
  const [secondYear, setSecondYear] = useState(yearList);
  //
  const onSubmitHandler = (event) => {
    if (firstYearRef.current.value === secondYearRef.current.value) {
      console.log("CHANGE THE YEAR");
    } else {
      dispatch({
        type: OPTIONS_UI_ONE_LEVEL,
        year0: firstYearRef.current.value,
        year1: secondYearRef.current.value,
      });
    }
  };
  const onChangeHandlerFirst = () => {
    setSecondYear(() =>
      yearList.filter((year) => parseInt(year) > firstYearRef.current.value)
    );
  };
  const onChangeHandlerSecond = () => {
    setFirstYear(() =>
      yearList.filter((year) => parseInt(year) < secondYearRef.current.value)
    );
  };
  return (
    <section className={classes.menu}>
      <form onSubmit={onSubmitHandler} className={classes.formWrapper}>
        <div className={classes.inputWrapper}>
          <h1>Pilih Tahun</h1>
          <Select
            selectRef={firstYearRef}
            optionList={firstYear}
            label={"Tahun Pertama"}
            onChange={onChangeHandlerFirst}
          />
          <Select
            selectRef={secondYearRef}
            optionList={secondYear}
            label={"Tahun Kedua"}
            onChange={onChangeHandlerSecond}
          />
        </div>
        <button className={classes.btn} type="submit">
          Proses
        </button>
      </form>
    </section>
  );
};
export default OneLevelMenu;
