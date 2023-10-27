import axios from "axios";
import {  BASE_URL, GET_All_ISSUES } from '../../action-type';

export const getAllIssues = () => {

  let userId = "712020:8a4ac3e0-8800-405a-96a0-a09c82e1a727"

  const bodyData = {
    "jql": `reporter=${userId} order by created DESC`
  }

  return async (dispatch) => {
    try {
      const response = (await axios.post(`${BASE_URL}/incident/searchAll`, bodyData)).data;


      const filteredData = response?.filter((item) => item?.fields.project.projectCategory.name === 'notificacionesIncidencias')

      dispatch({type: GET_All_ISSUES, payload: filteredData})

      return filteredData
    } catch (error) {
      console.log('Error al realizar la solicitud getAllIssues');

    }
  };
};