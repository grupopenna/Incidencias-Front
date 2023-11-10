import axios from "axios";
import { BASE_URL, GET_APPROVE } from '../../action-type';

export const getApprove = () => {
  const sebaId = "assignee = '712020:75da847b-f656-4020-a3fd-84d8811cd76f'";
  const caroId = "OR assignee = '712020:8a4ac3e0-8800-405a-96a0-a09c82e1a727'";
  const matiId = "OR assignee = '712020:8c8ba427-80db-46bb-bde6-7e348494be51'";
  const JuliId = "OR assignee = '712020:551c6fcf-0980-47af-ae45-a41c6190b9a8'";
  const davidId = "OR assignee = '712020:d7c27d21-d4b5-49c8-9826-0c6200460430'";
  const lucianoId = "OR assignee = '712020:0fd1b2ba-3b62-4e80-8e0f-2a26b57eb763'";
  const leanId = "OR assignee = '70121:bc7aed0b-2e5a-4f21-ada2-7ed136dff588'";
  // const datosId = "AND assignee = '712020:d9a3d5ae-1413-4506-b4a7-3ff4f33cb25a'";

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
    "jql": `(labels = APROBADO AND (not TOP = TOP1 AND not TOP = TOP2 AND not TOP = TOP3 AND not TOP = TOP4 AND not TOP = TOP5)) AND (${sebaId} ${caroId} ${matiId} ${JuliId} ${davidId} ${lucianoId} ${leanId})`
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