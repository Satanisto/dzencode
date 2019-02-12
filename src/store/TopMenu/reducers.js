import { SET_DATE, CHANGE_ACTIVE_USERS } from "./actions";

const defaultState = {
  date: {
    day: "",
    nameOfDay: "",
    month: "",
    year: "",
    time: ""
  },
  active_users: 1
};

export const headerReducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_DATE: {
      return {
        ...state,
        date: action.payload
      };
    }
    case CHANGE_ACTIVE_USERS: {
      return {
        ...state,
        active_users: action.payload
      };
    }
    default: {
      return state;
    }
  }
};
