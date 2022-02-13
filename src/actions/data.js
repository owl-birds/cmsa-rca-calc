import * as api from "../api";
import {
  READ_CSV,
  READ_CSV_ERROR,
  SELF_INPUT_DATA,
  EDIT_DATA,
} from "../constants/actionTypes";

// REDUX
import { useSelector } from "react-redux";

// helper functions
import { editCell } from "../helpers/utils";

export const parseCsv = (stringData) => async (dispatch) => {
  try {
    const data = await api.readCSV(stringData);
    const columns = data.columns.map((col) => {
      return {
        Header: col,
        accessor: col,
      };
    });
    data.columns = columns;
    dispatch({ type: READ_CSV, payload: data });
  } catch (error) {
    dispatch({ type: READ_CSV_ERROR, error: error.message });
  }
};
export const editData =
  (index, columnName, editedValue) => async (dispatch) => {
    const data = useSelector((state) => state.data);
    try {
    } catch (error) {}
  };
