import axios from "axios";
import { BASE_URL, GET_WORKLOG } from '../../action-type';

export const getWorklog = (idUser) => {

  const initDate = `2023-09-01`
  const finalDate = `2023-11-01`

  let bodyData = {
    "expand": [ "operations","versionedRepresentations","editmeta","changelog","renderedFields"],
    "fields": [
      "id",
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
      "transitions"
    ],
    "jql": `worklogAuthor = ${idUser} AND timespent != EMPTY AND worklogDate >=${initDate} AND worklogDate <= ${finalDate} ORDER BY timespent DESC`
  }

  return async (dispatch) => {
    try {
      const response = (await axios.post(`${BASE_URL}/worklog/search/`, bodyData));
      if (response.status === 200) dispatch({ type: GET_WORKLOG, payload: response.data })
      return response.data
    } catch (error) {
      console.log('Error al realizar la solicitud getWorklog');
    }
  };
};