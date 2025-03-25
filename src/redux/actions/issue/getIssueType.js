import axios from "axios";
import {  BASE_URL, GET_ISSUETYPE } from '../../action-type';

const ISSUE_TYPES_USER = {
    TAREA: 'Tarea',
    TRABAGESTION: 'Traba gestion',
    CRITICO: 'Critico',
    RESOLUCION24: 'Resolucion 24hs',
    NR: 'NuevoRequerimiento'
}

const SHOW_ISSUE_TYPES = {
    [ISSUE_TYPES_USER.TRABAGESTION]: true,
    [ISSUE_TYPES_USER.TAREA]: false, // Switch to true for display the issue type
    [ISSUE_TYPES_USER.NR]: true,
    [ISSUE_TYPES_USER.CRITICO]: true,
    [ISSUE_TYPES_USER.RESOLUCION24]: true
}


const SHOW_ISSUE_TYPES_DEBO = {
    [ISSUE_TYPES_USER.TRABAGESTION]: true,
    [ISSUE_TYPES_USER.TAREA]: true, 
}

export const getIssueTypes = (projectId) => {
    return async (dispatch) => {
        try {
            const response = await axios(`${BASE_URL}/board/getIssuestype/${projectId}`)
            //console.log('RES_ISSUETYPE', response.data.issuesType)
            const filteredData = response.data?.issuesType?.filter((issue) => projectId === 'DEBO' ? SHOW_ISSUE_TYPES_DEBO[issue.name] : SHOW_ISSUE_TYPES[issue.name] )
            dispatch({ type: GET_ISSUETYPE, payload: {issuesType: filteredData, id: response.data.id}})
        } catch (err) {
            console.log(err)
            console.error('Error al realizar la peticions')
        }
    }
}
