import axios from "axios";
import { BASE_URL, GET_PROJECTS } from '../../action-type';

export const getProjects = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${BASE_URL}/project/search`);

      dispatch({ type: GET_PROJECTS, payload: response.data });
      console.log('response', response)

      return response.data;
    } catch (error) {
      console.log('Error al realizar la solicitud getProjects:', error);

      throw error;
    }
  };
};
