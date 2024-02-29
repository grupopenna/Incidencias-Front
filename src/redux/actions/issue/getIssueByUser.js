import axios from "axios";
import { BASE_URL, GET_ISSUES } from '../../action-type';
import { JIRA_FIELDS, JIRA_EXPAND } from '../../../utils/index'

export const getIssueByUser = (key, idUser) => {

  let bodyData = {
    "expand": JIRA_EXPAND,
    "fields": JIRA_FIELDS,
    "jql": `project=${key} and reporter=${idUser}`
  }

  return async (dispatch) => {
    try {
      const response = (await axios.post(`${BASE_URL}/incident/issuesByUser`, bodyData));
      if (response.status === 200) dispatch({ type: GET_ISSUES, payload: response.data })
      return response.data
    } catch (error) {
      console.log('Error al realizar la solicitud getIssue');
    }
  };
};