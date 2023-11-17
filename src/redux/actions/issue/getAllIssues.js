import axios from "axios";
import { BASE_URL, GET_All_ISSUES } from '../../action-type';

export const getAllIssues = (userId) => {

  const bodyData = {
    "expand": [
      "names"
      // "operations"
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
      "updated",
      "customfield_10106",
      "customfield_10107"

    ],
    "jql": `reporter=${userId} order by created DESC`
  }

  return async (dispatch) => {
    try {
      const response = (await axios.post(`${BASE_URL}/incident/searchAll`, bodyData)).data;

      const filteredData = response?.filter((item) => item?.fields.project?.projectCategory?.name === 'notificacionesIncidencias')

      dispatch({ type: GET_All_ISSUES, payload: filteredData })

      return filteredData
    } catch (error) {
      console.log('Error al realizar la solicitud getAllIssues');

    }
  };
};