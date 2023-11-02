import {
  //ISSUES
  POST_ISSUE,
  GET_ISSUES,
  GET_All_ISSUES,

  GET_PROJECTS,

  POST_USER,

  GET_TRANSITIONS,

  GET_BOARD,
  GET_COMMENT_ISSUES,
  CLEAR_COMMENT_STATE,
  NEW_COMMENT,

  GET_ISSUETYPE,

  GET_WORKLOG,
  GET_ISSUE_BY_KEY,
  CLEAR_ISSUE_BY_KEY,


} from "./action-type";

const initialState = {

  incients: [],
  allIncients: [],

  projects: [],

  board: [],

  user: {
    fullName: "Juana De prueba",
    email: "juanaDeprueba@penna.com.ar",
    company: "",
    area: "",
    rol: "",
    jiraAccountId: "qm:c0387339-02b1-4e0d-8f36-3232066900ca:b5398dba-f790-4ee2-a5cc-1acc95bf39a9"
  },

  transitions: [],

  commentIssuesById: [],

  issuesTypes: [],

  worklogs: [],

  issueByKey: []

};
const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    //PRODUCTS
    case POST_ISSUE:
      return { ...state, incients: payload };
    case GET_ISSUES:
      return { ...state, incients: payload }
    case GET_All_ISSUES:
      return { ...state, allIncients: payload }

    case GET_PROJECTS:
      return { ...state, projects: payload }

    case GET_BOARD:
      return { ...state, board: payload }

    case POST_USER:
      return { ...state, user: payload }

    case GET_TRANSITIONS:
      return { ...state, transitions: payload }

    case GET_COMMENT_ISSUES:
      return { ...state, commentIssuesById: payload }
    case CLEAR_COMMENT_STATE:
      return { ...state, commentIssuesById: [] }
    case NEW_COMMENT:
      return { ...state, commentIssuesById: [...state.commentIssuesById, payload] }

    case GET_ISSUETYPE:
      return { ...state, issuesTypes: payload }

    case GET_WORKLOG:
      return { ...state, worklogs: payload }

    case GET_ISSUE_BY_KEY:
      return { ...state, issueByKey: payload }

    case CLEAR_ISSUE_BY_KEY:
      return { ...state, issueByKey: [] }

    default:
      return { ...state, worklogs: payload };
  }
};

export default reducer;