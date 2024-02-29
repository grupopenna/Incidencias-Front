import axios from "axios";
import { BASE_URL, GET_All_ISSUES } from '../../action-type';
import { JIRA_EXPAND, JIRA_FIELDS } from '../../../utils/index'

export const getAllIssues = (userId) => {

  const bodyData = {
    "expand": JIRA_EXPAND,
    "fields": JIRA_FIELDS,
    "jql": `reporter=${userId} order by created DESC`
  }

  return async (dispatch) => {
    try {
      const response = (await axios.post(`${BASE_URL}/incident/searchAll`, bodyData)).data;
      const filteredData = response?.filter((item) => item?.fields.projectCategory?.name === 'notificacionesIncidencias')

      dispatch({ type: GET_All_ISSUES, payload: filteredData })

      return filteredData
    } catch (error) {
      console.log('Error al realizar la solicitud getAllIssues');

    }
  };
};