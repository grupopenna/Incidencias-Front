import axios from "axios";
import { BACK_AUTH_URL, SET_USER_DATA } from '../../action-type';

export const postCheckToken = (token) => {
  return async (dispatch) => {
    const bearer = `Bearer ${token}`
    try {
      const response = await axios.get(`${BACK_AUTH_URL}/auth`, {
        headers: {
          "Authorization": bearer
        }
      })

      console.log('response postCheckToken', response)

      if (response.status >= 300) {
        return response
      }

      dispatch({type: SET_USER_DATA, payload: response})

      return response

    } catch (error) {
      console.error('Error al realizar la solicitud postCheckToken:', error);
      return error.response

    }
  };
};