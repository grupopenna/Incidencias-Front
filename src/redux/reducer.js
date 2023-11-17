import {
  //ISSUES
  POST_ISSUE,
  GET_ISSUES,
  GET_All_ISSUES,
  GET_TOP,
  GET_APPROVE,

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
  ERROR_GET_ISSUE_BY_KEY,
  GET_USERS_IT,

  GET_ISSUES_IN_PROCESS,
  ERROR_GET_ISSUES_IN_PROCESS

} from "./action-type";

const initialState = {

  incients: [],
  allIncients: [],

  incidentsInProcess: [],
  errorIncidentsInProcess: null,

  top: [],
  approve: [],

  projects: [],

  board: [],

  user: {
    fullName: "Sebastian Almiron",
    email: "sistemas4@penna.com.ar",
    company: "",
    area: "",
    rol: "",
    jiraAccountId: "712020:75da847b-f656-4020-a3fd-84d8811cd76f"
  },

  transitions: [],

  commentIssuesById: [],

  issuesTypes: [],

  worklogs: [],

  issueByKey: [],

  issueByKeyError: false,

  users: []

};
const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    //PRODUCTS
    case POST_ISSUE:
      return { ...state, incients: payload };
    case GET_ISSUES:
      return { ...state, incients: payload };
    case GET_All_ISSUES:
      return { ...state, allIncients: payload };
    case GET_TOP:
      return { ...state, top: payload };
    case GET_APPROVE:
      return { ...state, approve: payload }

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
      return { ...state, issueByKey: [payload], issueByKeyError: false  }

    case CLEAR_ISSUE_BY_KEY:
      return { ...state, issueByKey: [], issueByKeyError: false }

    
    case ERROR_GET_ISSUE_BY_KEY:
      return { ...state, issueByKeyError: true }

    case GET_USERS_IT:
      return { ...state, users: payload }

    case GET_ISSUES_IN_PROCESS:
        return { ...state, incidentsInProcess: payload }

    case ERROR_GET_ISSUES_IN_PROCESS:
        return { ...state, errorIncidentsInProcess: payload }
    default:
    return { ...state, worklogs: payload };
  }
};

export default reducer;