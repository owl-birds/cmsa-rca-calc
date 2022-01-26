import classes from "./TwoLevel.module.css";
import DropFileInput from "../ui/DropFileInput";
import Table from "../ui/Table";
import TwoLevelMenu from "../ui/TwoLevelMenu";
import { useDispatch, useSelector } from "react-redux";

// STATE CONSTANT ACTION
import { CLEAR_STATE } from "../../constants/actionTypes";

// FORMULA
import { two_level_all } from "../../helpers/cmsa-two-level";
// UTILS
import { uniqueRow, uniqueYear } from "../../helpers/utils";
const TwoLevel = () => {
  const dispatch = useDispatch();
  const state = useSelector((state) => state.data);
  const ui = useSelector((state) => state.ui);
  // console.log(state);
  console.log(ui);
  const twoLevelResult = state.isLoaded
    ? ui.isOptionSelected
      ? two_level_all(
          state.data,
          "Dunia",
          uniqueRow(state.data, "country"),
          ui.firstYear,
          ui.secondYear,
          ui.cmsaType
        )
      : null
    : null;
  // console.log(ui.isOptionSelected);
  const uniqueYearList = state.isLoaded ? uniqueYear(state.data) : null;
  // console.log(uniqueYearList);
  const resetHandler = () => {
    dispatch({ type: CLEAR_STATE });
  };

  return (
    <main className={classes.content}>
      <div>
        <h1 className={classes.title}>TWO LEVEL</h1>
        {state.isLoaded ? null : <DropFileInput />}
      </div>
      {state.isLoaded ? (
        <div className={classes.tableWrapper}>
          <button onClick={() => resetHandler()}>Reset</button>
          <Table columns={state.data.columns} data={state.data} />
          <TwoLevelMenu yearList={uniqueYearList} />
          {ui.isOptionSelected ? (
            <>
              <h1>CMSA FOR {`${ui.firstYear}-${ui.secondYear}`}</h1>
              <Table columns={twoLevelResult.columns} data={twoLevelResult} />
            </>
          ) : null}
        </div>
      ) : null}
    </main>
  );
};
export default TwoLevel;
