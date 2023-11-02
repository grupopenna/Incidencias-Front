import axios from "axios";
import { BASE_URL } from '../../action-type';
import { getIssue } from "./getIssue";
import { getTransitions } from "../transitions";

export const deleteIssues = (key, userId) => {
  const [issueId] = key.split('-')

  const bodyData = {
    "jql": `reporter=${userId} order by created DESC`
  }

  return async (dispatch) => {
    try {
      const response = (await axios.delete(`${BASE_URL}/incident/deleteIssue/${key}`, bodyData));
      if (response.status === 204) {
        await getIssue(`${issueId}`, userId)(dispatch).then(async (response) => {
          if (response !== undefined || response.length > 0) {
            await getTransitions(response[0].key)(dispatch)
          }
        })
      }
    } catch (error) {
      console.log('Error al realizar la solicitud deleteIssues');

    }
  };
}