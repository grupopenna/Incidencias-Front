import axios from "axios";
import { BASE_URL, GET_TOP } from '../../action-type';

export const getTopFive = () => {
  const bodyData = {
    "expand": [
      "names",
      "schema",
      "operations", "changelog"
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
      "attachment",
      "project",
      "created",
      "updated"
    ],
    "jql": `(TOP = TOP1 OR TOP = TOP2 OR TOP = TOP3 OR TOP = TOP4 OR TOP = TOP5) AND (@ids)`
  }
  

  return async (dispatch) => {
    try {
      const response = (await axios.post(`${BASE_URL}/incident/getTop`, bodyData)).data;
      console.log('response', response)

      dispatch({ type: GET_TOP, payload: response })

      return response
    } catch (error) {
      console.log('Error al realizar la solicitud getTopFive');

    }
  };
};