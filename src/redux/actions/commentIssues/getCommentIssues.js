import axios from "axios";
import { BASE_URL, GET_COMMENT_ISSUES, CLEAR_COMMENT_STATE } from '../../action-type';
import { formatJiraText } from "../../../utils";

export const getCommentIssues = (key) => {
  // const userId = "712020:8a4ac3e0-8800-405a-96a0-a09c82e1a727"

  // const bodyData = {
  //   "jql": `reporter=${userId} order by created DESC`
  // }

  const bodyData = {
    "jql": `issue=${key}`,
    "fields": [
      "key",
      "summary",
      "comment",
      "updateAuthor",
      "author",
      "created",
      "updated"
    ]
  }

  return async (dispatch) => {
    try {
      const response = (await axios.post(`${BASE_URL}/incident/getComment/`, bodyData)).data;
      const res = response.issues[0].fields.comment.comments
      const comments = res;

      const values = comments.map((comment) => {
        const { body: { content }, author, updated } = comment
        return formatJiraText(content, author, updated)
      })

      dispatch({ type: GET_COMMENT_ISSUES, payload: values.reverse() })
      return response
    } catch (error) {
      console.log(error)
      console.log('Error al realizar la solicitud getCommentIssues');

    }
  };
}

export const clearAllCommentState = () => {
  return (dispatch) => {
    dispatch({ type: CLEAR_COMMENT_STATE })
  }
}