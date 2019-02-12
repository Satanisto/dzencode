import {
  SET_API,
  TOGGLE_STATE,
  CHANGE_ACTIVE_PARISH,
  CHANGE_ACTIVE_PRODUCT,
  SET_SEARCH_VALUES_TYPE,
  SET_SEARCH_VALUES_SPECIFICATION
} from "./actions";

const defaultState = {
  data: {},
  stateOfInterface: "DEFAULT",
  activeParish: {},
  activeProduct: {},
  type: "",
  specification: ""
};

export const contentReduser = (state = defaultState, action) => {
  switch (action.type) {
    case SET_API: {
      return {
        ...state,
        data: action.payload
      };
    }
    case TOGGLE_STATE: {
      return {
        ...state,
        stateOfInterface: action.payload
      };
    }
    case CHANGE_ACTIVE_PARISH: {
      return {
        ...state,
        activeParish: action.payload
      };
    }
    case CHANGE_ACTIVE_PRODUCT: {
      return {
        ...state,
        activeProduct: action.payload
      };
    }
    case SET_SEARCH_VALUES_TYPE: {
      return {
        ...state,
        type: action.payload
      };
    }
    case SET_SEARCH_VALUES_SPECIFICATION: {
      return {
        ...state,
        specification: action.payload
      };
    }
    default: {
      return state;
    }
  }
};
