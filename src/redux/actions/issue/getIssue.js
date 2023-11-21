import axios from "axios";
import { BASE_URL, GET_ISSUES } from '../../action-type';

export const getIssue = (key, userId) => {

  if (key === '') return 
  
  return async (dispatch) => {
    try {
      const response = (await axios.get(`${BASE_URL}/incident/search/${key}/${userId}`));
      if (response.status === 200) dispatch({ type: GET_ISSUES, payload: response.data })
      return response.data
    } catch (error) {
      console.log('Error al realizar la solicitud getIssue');
    }
  };
};