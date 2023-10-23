import axios from "axios";
import {  BASE_URL, POST_USER } from '../../action-type';

export const postUser = () => {
  return async (dispatch) => {
    
      const userData = {
        email: "Clienteaplicacion@jira.com",
        displayName: "cliente desde app"
      }
      try {
        const response = (await axios.post(`${BASE_URL}/user/customer`, userData)).data;

        dispatch({type: POST_USER, payload: response})

        return response

      } catch (error) {
        console.error('Error al realizar la solicitud postUser:', error);

      }
    };
};