import classes from "./OneLevel.module.css";
// components
import DropFileInput from "../ui/DropFileInput";
import Table from "../ui/Table";
import OneLevelMenu from "../ui/OneLevelMenu";
//
import { useSelector, useDispatch } from "react-redux";

// STATE CONSTANT ACTION
import { CLEAR_STATE } from "../../constants/actionTypes";

// FORMULA
import { one_level_all } from "../../helpers/cmsa-one-level";
// UTILS
import { uniqueRow, uniqueYear } from "../../helpers/utils";

const OneLevel = () => {
  const dispatch = useDispatch();
  // ?STATES REDUX
  const state = useSelector((state) => state.data);
  const ui = useSelector((state) => state.ui);
  // console.log(state);
  // console.log(ui);

  // VARIABLES
  const oneLevelResult = state.isLoaded
    ? ui.isOptionSelected
      ? one_level_all(
          "Dunia",
          uniqueRow(state.data, "country"),
          state.data,
          ui.firstYear,
          ui.secondYear
        )
      : null
    : null;
  // console.log(oneLevelResult);
  const uniqueYearList = state.isLoaded ? uniqueYear(state.data) : null;
  // console.log(uniqueYearList);
  const resetHandler = () => {
    dispatch({ type: CLEAR_STATE });
  };
  return (
    <main className={classes.content}>
      <div>
        <h1 className={classes.title}>ONE LEVEL</h1>
        {state.isLoaded ? null : <DropFileInput />}
      </div>
      {/* <div className={classes.tableWrapper}> */}
      {state.isLoaded ? (
        <div className={classes.tableWrapper}>
          <button onClick={() => resetHandler()}>Reset</button>
          <Table
            isEditAble={true}
            columns={state.data.columns}
            data={state.data}
          />
          <OneLevelMenu yearList={uniqueYearList} />
          {ui.isOptionSelected ? (
            <>
              <h1>CMSA FOR {`${ui.firstYear}-${ui.secondYear}`}</h1>
              <Table columns={oneLevelResult.columns} data={oneLevelResult} />
            </>
          ) : null}
        </div>
      ) : null}
      {/* </div> */}
    </main>
  );
};
export default OneLevel;
