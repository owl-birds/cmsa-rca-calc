import { READ_CSV, CLEAR_STATE, EDIT_DATA } from "../constants/actionTypes";
// UTILS
import { editCell } from "../helpers/utils";

const data = (data = [], action) => {
  switch (action.type) {
    case READ_CSV:
      return {
        ...data,
        data: action.payload,
        isLoaded: true,
        message: "DATA HAD BEEN READ",
      };
    case CLEAR_STATE:
      data = [];
      return { ...data, isLoaded: false, message: "DATA STATE CLEARED" };
    case EDIT_DATA:
      // const editedData = editCell(
      //   data.data,
      //   action.editedValue,
      //   action.index,
      //   action.columnName
      // );
      data.data = editCell(
        data.data,
        action.editedValue,
        action.index,
        action.columnName
      );
      return { ...data };
    default:
      if (data.data)
        // if data still exist
        return {
          ...data,
          isLoaded: true,
          message: "DEAFULT BUT DATA STILL EXIST",
        };
      else return { ...data, isLoaded: false, message: "REDUX DEFAULT" };
  }
};
export default data;
