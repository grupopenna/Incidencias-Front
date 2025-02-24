import axios from "axios";
import { BASE_URL, GET_APPROVE } from '../../action-type';
import { JIRA_EXPAND, JIRA_FIELDS } from '../../../utils/index'
import { APROBADOS } from '../../../utils/jqls'

export const getApprove = (area) => {

  const bodyData = {
    "expand": JIRA_EXPAND,
    "fields": JIRA_FIELDS,
    "jql": APROBADOS
  }
  

  return async (dispatch) => {
    try {
      const response = (await axios.post(`${BASE_URL}/incident/getTop/?area=${area}`, bodyData)).data;

      dispatch({ type: GET_APPROVE, payload: response });

      return response
    } catch (error) {
      console.log('Error al realizar la solicitud getApprove');

    }
  };
};