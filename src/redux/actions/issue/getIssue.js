import axios from "axios";
import {  BASE_URL, GET_ISSUES } from '../../action-type';

export const getIssue = (key) => {


  // const bodyData = {
  //   "expand": [
  //     "names",
  //     "schema",
  //     "operations"
  //   ],
  //   "fields": [
  //     "summary",
  //     "status",
  //     "assignee"
  //   ],
  //   "fieldsByKeys": false,
  //   "jql": `project = ${key}`,
  //   "startAt": 0
  // }
    // "jql": "reporter = 'qm:c0387339-02b1-4e0d-8f36-3232066900ca:056bf32f-6d71-40be-89bc-3672d74725c3'",
    // "fields": ["key", "summary", "customfield_10019", "description", "timespent"]
    //    responsable, hs consumidas, comentarios, estado, hs estimadas, progreso, adjuntos, prioridad
    // }
  return async (dispatch) => {
    try {
      const response = (await axios.get(`${BASE_URL}/incident/search/${key}`)).data;

      dispatch({type: GET_ISSUES, payload: response})

      return response
    } catch (error) {
      console.log('Error al realizar la solicitud getIssue');

    }
  };
};