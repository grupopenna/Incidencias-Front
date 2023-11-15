import axios from "axios";
import { BASE_URL, GET_APPROVE } from '../../action-type';

export const getApprove = () => {

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
    "jql": `(labels = APROBADO AND (not TOP = TOP1 AND not TOP = TOP2 AND not TOP = TOP3 AND not TOP = TOP4 AND not TOP = TOP5)) AND (@ids)`
  }
  

  return async (dispatch) => {
    try {
      const response = (await axios.post(`${BASE_URL}/incident/getTop`, bodyData)).data;
      console.log('response', response)

      dispatch({ type: GET_APPROVE, payload: response })

      return response
    } catch (error) {
      console.log('Error al realizar la solicitud getApprove');

    }
  };
};