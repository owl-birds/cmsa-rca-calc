import { READ_CSV, CLEAR_STATE } from "../constants/actionTypes";
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
    default:
      if (data.data)
        return {
          ...data,
          isLoaded: true,
          message: "DEAFULT BUT DATA STILL EXIST",
        };
      else return { ...data, isLoaded: false, message: "REDUX DEFAULT" };
  }
};
export default data;
