import axios from "axios";
import { BASE_URL, GET_COMMENT_ISSUES, CLEAR_COMMENT_STATE } from '../../action-type';
import { formatJiraText } from "../../../utils";
import { JIRA_FIELDS } from '../../../utils/index'

export const getCommentIssues = (key) => {

  const bodyData = {
    "jql": `issue=${key}`,
    "fields": JIRA_FIELDS
  }

  return async (dispatch) => {
    try {
      const response = (await axios.post(`${BASE_URL}/incident/getComment/`, bodyData)).data;
      const res = response.issues[0].fields.comment.comments

      const values = res.map((comment) => {
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