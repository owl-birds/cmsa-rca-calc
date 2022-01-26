import classes from "./TwoLevelMenu.module.css";
import { useRef, useState } from "react";
// REDUX
import { useDispatch } from "react-redux";
// CONSTANT REDUX
import { OPTIONS_UI_TWO_LEVEL } from "../../constants/actionTypes";
// components
import Select from "./Select";
import RadioInput from "./RadioInput";
const TwoLevelMenu = ({ yearList }) => {
  // REF
  const firstYearRef = useRef(null);
  const secondYearRef = useRef(null);
  const [cmsaType, setCmsaType] = useState(Boolean);
  // STATE
  const [firstYear, setFirstYear] = useState(yearList);
  const [secondYear, setSecondYear] = useState(yearList);
  // DISPATHC (REDUX)
  const dispatch = useDispatch();
  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (firstYearRef.current.value === secondYearRef.current.value) {
      console.log("CHANGE THE YEAR");
    } else {
      console.log(cmsaType);
      dispatch({
        type: OPTIONS_UI_TWO_LEVEL,
        year0: firstYearRef.current.value,
        year1: secondYearRef.current.value,
        cmsaType,
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
      <h1 className={classes.title}>OPTIONS</h1>
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
        <div className={classes.inputWrapper}>
          <h1>Pilih tipe CMSA</h1>
          <RadioInput
            detail={[
              { value: true, name: "commodity" },
              { value: false, name: "region" },
            ]}
            setRadioValue={setCmsaType}
          />
        </div>

        <button className={classes.btn} type="submit">
          Proses
        </button>
      </form>
    </section>
  );
};
export default TwoLevelMenu;
