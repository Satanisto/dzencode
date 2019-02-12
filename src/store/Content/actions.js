export const SET_API = "SET_API";
export const TOGGLE_STATE = "TOGGLE_STATE";
export const CHANGE_ACTIVE_PARISH = "CHANGE_ACTIVE_PARISH";
export const CHANGE_ACTIVE_PRODUCT = "CHANGE_ACTIVE_PRODUCT";
export const SET_SEARCH_VALUES_TYPE = "SET_SEARCH_VALUES_TYPE";
export const SET_SEARCH_VALUES_SPECIFICATION =
  "SET_SEARCH_VALUES_SPECIFICATION";

export const setAPI = data => ({
  type: SET_API,
  payload: data
});

export const toggleState = data => ({
  type: TOGGLE_STATE,
  payload: data
});

export const changeActiveParish = data => ({
  type: CHANGE_ACTIVE_PARISH,
  payload: data
});

export const changeActiveProduct = data => ({
  type: CHANGE_ACTIVE_PRODUCT,
  payload: data
});

export const setSearchValuesType = data => ({
  type: SET_SEARCH_VALUES_TYPE,
  payload: data
});

export const setSearchValuesSpecification = data => ({
  type: SET_SEARCH_VALUES_SPECIFICATION,
  payload: data
});
