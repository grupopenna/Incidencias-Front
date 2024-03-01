import axios from 'axios'
import { 
  BASE_URL, 
  GET_WORKLOADS
} from '../../action-type'
import { JIRA_EXPAND, JIRA_FIELDS } from '../../../utils/index'
import { WORKLOADS } from '../../../utils/jqls'

export const getWorkload = () => {
    const bodyData = {
        "expand": JIRA_EXPAND,
        "fields": JIRA_FIELDS,
        "jql": WORKLOADS
      }
    return async (dispatch) => {
        try {
            const response = await axios.post(`${BASE_URL}/incident/searchAll`, bodyData)
          console.log('response', response)
          console.log('response', response.data)
          // console.log('issues?.fields?.consultor', issues[45]?.fields?.consultor)

            dispatch({ type: GET_WORKLOADS, payload: response.data })
        } catch (error) {
            console.log('Error al realizar la solicitud')
            return error
        }
    }
}

