import axios from "axios";
import { BASE_URL, GET_PRIORIZADOSXAREA_ISSUES } from '../../action-type';
import { JIRA_FIELDS, JIRA_EXPAND } from '../../../utils/index'
import { PRIORIZADOS_POR_AREA } from '../../../utils/jqls'

export const getAreaPriorizado = () => {

  const bodyData = {
    "expand": JIRA_EXPAND,
      "fields": JIRA_FIELDS,
    "jql": PRIORIZADOS_POR_AREA
  }

  return async (dispatch) => {
    try {
      const response = (await axios.post(`${BASE_URL}/incident/areaPriorizado`, bodyData)).data;

      dispatch({ type: GET_PRIORIZADOSXAREA_ISSUES, payload: response })

      return response
    } catch (error) {
      console.log('Error al realizar la solicitud getAreaPriorizado');

    }
  };
};