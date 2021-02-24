import {
  SET_LOGGED_USER,
  SET_USER_LIST,
  SET_GRAPH_DATA,
  SET_USER_TO_LOCATE,
  SHOW_MAP,
} from "./actionTypes";

export const setLoggedUser = (value) => {
  return {
    type: SET_LOGGED_USER,
    payload: value,
  };
};

export const setUserList = (value) => {
  return {
    type: SET_USER_LIST,
    payload: value,
  };
};

export const setGraphData = (value) => {
  return {
    type: SET_GRAPH_DATA,
    payload: value,
  };
};

export const setUserToLocate = (value) => {
  return {
    type: SET_USER_TO_LOCATE,
    payload: value,
  };
};

export const setShowMap = (value) => {
  return {
    type: SHOW_MAP,
    payload: value,
  };
};
