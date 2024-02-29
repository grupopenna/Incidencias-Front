import axios from "axios";
import { BASE_URL, GET_TOP } from '../../action-type';
import { JIRA_EXPAND, JIRA_FIELDS } from '../../../utils/index'
import { TOP_FIVE } from '../../../utils/jqls'

export const getTopFive = (area) => {
  const bodyData = {
    "expand": JIRA_EXPAND,
    "fields": JIRA_FIELDS,
    "jql": TOP_FIVE
  }
  

  return async (dispatch) => {
    try {
      const response = (await axios.post(`${BASE_URL}/incident/getTop/?area=${area}`, bodyData)).data;

      dispatch({ type: GET_TOP, payload: response })

      Object.keys(response).forEach((key) => {
          response[key]?.sort((issueA, issueB) => {
              const statusIssueA = issueA.fields.status 
              const statusIssueB = issueB.fields.status 

              if ( statusIssueA === 'Validar' && statusIssueB !== 'Validar' ) return -1
              if ( statusIssueA !== 'Validar' && statusIssueB === 'Validar')  return 1

              if ( statusIssueA === 'Priorizado' && (statusIssueB === 'Validar' || statusIssueB === 'En Proceso') ) return 1
              if ( (statusIssueA === 'Validar' || statusIssueA === 'En Proceso') && statusIssueB === 'Priorizado' ) return -1

              return 0
          })
      })

      return response
    } catch (error) {
      console.log('Error al realizar la solicitud getTopFive');

    }
  };
};