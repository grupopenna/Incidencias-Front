import axios from "axios";
import {  BASE_URL, GET_ISSUETYPE } from '../../action-type';

const ISSUE_TYPES_USER = {
    TAREA: 'Tarea',
    TRABAGESTION: 'Error'
}

const SHOW_ISSUE_TYPES = {
    [ISSUE_TYPES_USER.TRABAGESTION]: true,
    [ISSUE_TYPES_USER.TAREA]: true,
}

export const getIssueTypes = (projectId) => {


    return async (dispatch) => {
        try {
            const response = await axios(`${BASE_URL}/board/getIssuestype/${projectId}`)
            const filteredData = response.data?.issuesType?.filter((issue) => SHOW_ISSUE_TYPES[issue.name] )
            dispatch({ type: GET_ISSUETYPE, payload: {issuesType: filteredData, id: response.data.id}})
        } catch (err) {
            console.log(err)
            console.error('Error al realizar la peticions')
        }
    }
}
