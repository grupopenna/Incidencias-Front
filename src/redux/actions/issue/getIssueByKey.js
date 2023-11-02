import axios from "axios";
import { BASE_URL, CLEAR_ISSUE_BY_KEY, GET_ISSUE_BY_KEY } from '../../action-type';

export const getIssueByKey = (key) => {
  return async (dispatch) => {

    try {
      const response = (await axios.get(`${BASE_URL}/incident/getIssueByKey/${key}`));
      dispatch({ type: GET_ISSUE_BY_KEY, payload: response.data })
    } catch (error) {
      console.log(`error al realizar la solicitud: ${error}`)
    }
  }
}

export const clearIssueByKey = () => {
  return (dispatch) => {
    dispatch({ type: CLEAR_ISSUE_BY_KEY })
  }
}