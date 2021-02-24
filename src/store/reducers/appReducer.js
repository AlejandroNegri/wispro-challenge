import {
  SET_LOGGED_USER,
  SET_USER_LIST,
  SET_GRAPH_DATA,
  SET_USER_TO_LOCATE,
  SHOW_MAP,
} from "../actions/actionTypes";

const INITIAL_STATE = {
  loggedUser: "",
  userList: [],
  graphData: [],
  userToLocate: {},
  showMap: false,
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case SET_LOGGED_USER:
      return {
        ...state,
        loggedUser: action.payload,
      };

    case SET_USER_LIST:
      return {
        ...state,
        userList: action.payload,
      };

    case SET_GRAPH_DATA:
      return {
        ...state,
        graphData: action.payload,
      };

    case SET_USER_TO_LOCATE:
      return {
        ...state,
        userToLocate: action.payload,
      };

    case SHOW_MAP:
      return {
        ...state,
        showMap: action.payload,
      };

    default:
      return state;
  }
}
