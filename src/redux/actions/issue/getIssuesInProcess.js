import axios from 'axios'
import { 
  BASE_URL, 
  GET_ISSUES_IN_PROCESS, 
  ERROR_GET_ISSUES_IN_PROCESS 
} from '../../action-type'

export const getIssuesInProcess = (JQL = `status = 'En Proceso'`) => {
    const bodyData = {
        "expand": [
          "names"
          // "operations"
        ],
        "fields": [
          "description",
          "issuetype",
          "summary",
          "status",
          "assignee",
          "accountId",
          "timetracking",
          "timeoriginalestimate",
          "aggregatetimeestimate",
          "aggregatetimespent",
          "customfield_10019",
          "worklog",
          "attachment",
          "project",
          "created",
          "updated",
          "customfield_10106",
          "customfield_10107"
    
        ],
        "jql": JQL
      }
    return async (dispatch) => {
        try {
            const response = await axios.post(`${BASE_URL}/incident/searchAll`, bodyData)
            const filteredData = response.data.filter((item) => item?.fields?.project.projectCategory.name === 'notificacionesIncidencias')

            dispatch({ type: GET_ISSUES_IN_PROCESS, payload: filteredData })
        } catch (error) {
            console.log('Error al realizar la solicitud')
            dispatch({ type: ERROR_GET_ISSUES_IN_PROCESS, payload: error })
        }
    }
}

