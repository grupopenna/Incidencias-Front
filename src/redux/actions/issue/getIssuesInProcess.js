import axios from 'axios'
import { 
  BASE_URL, 
  GET_ISSUES_IN_PROCESS, 
  ERROR_GET_ISSUES_IN_PROCESS 
} from '../../action-type'
import { JIRA_EXPAND, JIRA_FIELDS } from '../../../utils/index'
import { SIN_COMENZAR } from '../../../utils/jqls'

export const getIssuesInProcess = () => {
    const bodyData = {
        "expand": JIRA_EXPAND,
        "fields": JIRA_FIELDS,
        "jql": SIN_COMENZAR
      }
    return async (dispatch) => {
        try {
            const response = await axios.post(`${BASE_URL}/incident/searchAll`, bodyData)

            const filteredData = response.data.filter((item) => item?.fields?.projectCategory?.name == 'notificacionesIncidencias')

            dispatch({ type: GET_ISSUES_IN_PROCESS, payload: filteredData })
        } catch (error) {
            console.log('Error al realizar la solicitud')
            dispatch({ type: ERROR_GET_ISSUES_IN_PROCESS, payload: error })
        }
    }
}

