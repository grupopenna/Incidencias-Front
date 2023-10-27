import axios from "axios";
import { BASE_URL, NEW_COMMENT } from '../../action-type';

export const postComments = (comment, key) => {

  const bodyData = {
    "body": `${comment}`,
    "issueId": `${key}`,
  }
  return async (dispatch) => {
    try {
      const response = await axios.post(`${BASE_URL}/incident/newComments`, bodyData)
      if (response.status === 200) {
        dispatch({ type: NEW_COMMENT, payload: response.data })
      }

    } catch (error) {
      console.error('Error al realizar la solicitud:', error);

    }
  };
}