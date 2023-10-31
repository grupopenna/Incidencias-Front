import axios from "axios";
import { BASE_URL } from '../../action-type';
import { getIssue } from "./getIssue";
import { getTransitions } from "../transitions";

export const deleteIssues = (key) => {
  const [issueId] = key.split('-')
  const userId = "712020:8a4ac3e0-8800-405a-96a0-a09c82e1a727"

  const bodyData = {
    "jql": `reporter=${userId} order by created DESC`
  }

  return async (dispatch) => {
    try {
      const response = (await axios.delete(`${BASE_URL}/incident/deleteIssue/${key}`, bodyData));
      if (response.status === 204) {
        await getIssue(`${issueId}`)(dispatch).then(async (response) => {
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