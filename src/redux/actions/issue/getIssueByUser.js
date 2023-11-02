import axios from "axios";
import { BASE_URL, GET_ISSUES } from '../../action-type';

export const getIssueByUser = (key, idUser) => {

  let bodyData = {
    "expand": [
      "names",
      "schema",
      "operations"
    ],
    "fields": [
      "description",
      "issuetype",
      "summary",
      "status",
      "assignee",
      "accountId",
      "timetracking",
      "timeoriginalestimate",
      "aggregatetimeestimate",
      "aggregatetimespent",
      "customfield_10019",
      "worklog",
      "attachment"

    ],
    "jql": `project=${key} and reporter=${idUser}`
  }

  return async (dispatch) => {
    try {
      const response = (await axios.post(`${BASE_URL}/incident/issuesByUser`, bodyData));
      if (response.status === 200) dispatch({ type: GET_ISSUES, payload: response.data })
      return response.data
    } catch (error) {
      console.log('Error al realizar la solicitud getIssue');
    }
  };
};