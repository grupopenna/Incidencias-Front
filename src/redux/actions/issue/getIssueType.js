import axios from "axios";
import {  BASE_URL, GET_ISSUETYPE } from '../../action-type';


export const getIssueTypes = (projectId) => {


    return async (dispatch) => {
        try {
            const response = await axios(`${BASE_URL}/board/getIssuestype/${projectId}`)
            dispatch({ type: GET_ISSUETYPE, payload: response.data })
        } catch (err) {
            console.error('Error al realizar la peticions')
        }
    }
}
