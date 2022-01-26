import * as api from "../api";
import { READ_CSV, READ_CSV_ERROR } from "../constants/actionTypes";

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
