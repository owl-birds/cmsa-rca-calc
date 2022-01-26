import {
  OPTIONS_UI_TWO_LEVEL,
  OPTIONS_UI_ONE_LEVEL,
  CLEAR_STATE,
} from "../constants/actionTypes";

const ui = (ui = {}, action) => {
  switch (action.type) {
    case OPTIONS_UI_TWO_LEVEL:
      return {
        ...ui,
        isOptionSelected: true,
        firstYear: action.year0,
        secondYear: action.year1,
        cmsaType: action.cmsaType,
        message: "OPTIONS SELECTED",
      };
    case OPTIONS_UI_ONE_LEVEL:
      return {
        ...ui,
        isOptionSelected: true,
        firstYear: action.year0,
        secondYear: action.year1,
        message: "OPTIONS SELECTED",
      };
    case CLEAR_STATE:
      ui = [];
      return { ...ui, isOptionSelected: false, message: "UI STATE CLEARED" };
    default:
      return { ...ui, isOptionSelected: false, message: "UI DEFAULT" };
  }
};
export default ui;
