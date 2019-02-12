export const SET_DATE = "SET_DATE";
export const CHANGE_ACTIVE_USERS = "CHANGE_ACTIVE_USERS";

export const setDate = date => ({
  type: SET_DATE,
  payload: date
});

export const changeActiveUsers = date => ({
  type: CHANGE_ACTIVE_USERS,
  payload: date
});
