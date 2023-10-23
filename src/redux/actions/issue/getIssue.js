import axios from "axios";
import {  BASE_URL, GET_ISSUES } from '../../action-type';

export const getIssue = (key) => {

  let userId = "712020:75da847b-f656-4020-a3fd-84d8811cd76f"

  return async (dispatch) => {
    try {
      const response = (await axios.get(`${BASE_URL}/incident/search/${key}/${userId}`)).data;

      dispatch({type: GET_ISSUES, payload: response})

      return response
    } catch (error) {
      console.log('Error al realizar la solicitud getIssue');

    }
  };
};