import axios from "axios";
import { BASE_URL, GET_APPROVE } from '../../action-type';

export const getApprove = (area) => {

  const bodyData = {
    "expand": [
      "names", "schema", "operations", "changelog"
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
    "jql": `labels = APROBADO AND TOP = NULL`
  }
  

  return async (dispatch) => {
    try {
      const response = (await axios.post(`${BASE_URL}/incident/getTop/?area=${area}`, bodyData)).data;
      console.log('response', response);

      dispatch({ type: GET_APPROVE, payload: response });

      return response
    } catch (error) {
      console.log('Error al realizar la solicitud getApprove');

    }
  };
};