import axios from "axios";
import { BASE_URL, GET_COMMENT_ISSUES, CLEAR_COMMENT_STATE } from '../../action-type';

export const getCommentIssues = (key) => {
  let userId = "712020:75da847b-f656-4020-a3fd-84d8811cd76f"

  const bodyData = {
    "jql": `reporter=${userId} order by created DESC`
  }

  return async (dispatch) => {
    try {
      const response = (await axios.get(`${BASE_URL}/incident/getComment/${key}`, bodyData));
      dispatch({ type: GET_COMMENT_ISSUES, payload: response.data.comments })
      return response
    } catch (error) {
      console.log('Error al realizar la solicitud getCommentIssues');

    }
  };
}

export const clearAllCommentState = () => {
  return (dispatch) => {
    dispatch({ type: CLEAR_COMMENT_STATE })
  }
}