import axios from "axios";
import { BASE_URL_DESARROLLO, GET_PROJECTS } from '../../../action-type';

export const getProjects = () => {
  return async (dispatch) => {
    try {
      const response = await axios.get(`${BASE_URL_DESARROLLO}/algo`);

      dispatch({ type: GET_PROJECTS, payload: response.data });

      return response.data;
    } catch (error) {
      console.log('Error al realizar la solicitud getProjects:', error);

      throw error;
    }
  };
};
