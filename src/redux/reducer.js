import {
  //PRODUCTS
  POST_ISSUE,
  GET_ISSUES,
  GET_PROJECTS,
  POST_USER,
  GET_TRANSITIONS,
  GET_BOARD

} from "./action-type";

const initialState = {
  
  incients: [],

  projects: [],

  board: [],

  user: {},

  transitions: [],

};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
      //PRODUCTS
      case POST_ISSUE:
          return { ...state, incients: payload };
      case GET_ISSUES:
        return { ...state, incients: payload }
      case GET_PROJECTS:
        return { ...state, projects: payload }
      case GET_BOARD:
        return { ...state, board: payload }
      case POST_USER:
        return { ...state, user: payload }
      case GET_TRANSITIONS:
        return { ...state, transitions: payload }

      default:
          return { ...state };
  }
};

export default reducer;