import * as api from "../api";
import {
  READ_CSV,
  READ_CSV_ERROR,
  SELF_INPUT_DATA,
  EDIT_DATA,
} from "../constants/actionTypes";

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
  (data, index, columnName, editedValue) => async (dispatch) => {
    try {
      const temp = editCell(data, editedValue, index, columnName);
      // console.log(temp);
      dispatch({ type: EDIT_DATA, editedData: temp });
    } catch (error) {
      console.log(error);
    }
  };
