import axios from "axios";
import { BASE_URL, GET_All_ISSUES } from '../../action-type';

export const getAllIssues = () => {

  let userId = "712020:75da847b-f656-4020-a3fd-84d8811cd76f"

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
      "updated"
    ],
    "jql": `reporter=${userId} order by created DESC`
  }

  return async (dispatch) => {
    try {
      const response = (await axios.post(`${BASE_URL}/incident/searchAll`, bodyData)).data;
      console.log('response', response)

      const filteredData = response?.filter((item) => item?.fields.project.projectCategory.name === 'notificacionesIncidencias')

      dispatch({ type: GET_All_ISSUES, payload: filteredData })

      return filteredData
    } catch (error) {
      console.log('Error al realizar la solicitud getAllIssues');

    }
  };
};