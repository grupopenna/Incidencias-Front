import axios from "axios";
import { BASE_URL, GET_PRIORIZADOSXAREA_ISSUES } from '../../action-type';

export const getAreaPriorizado = () => {

  const bodyData = {
    "expand": [
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
        "labels",
        "worklog",
        "attachment",
        "project",
        "created",
        "updated"
      ],
    "jql": "(@areas) AND (status = Priorizado OR status = 'Sin Priorizar')"
  }

  return async (dispatch) => {
    try {
      const response = (await axios.post(`${BASE_URL}/incident/areaPriorizado`, bodyData)).data;

      dispatch({ type: GET_PRIORIZADOSXAREA_ISSUES, payload: response })

      return response
    } catch (error) {
      console.log('Error al realizar la solicitud getAreaPriorizado');

    }
  };
};