import axios from 'axios';
import {  SET_USER_DATA } from '../../action-type';

export const postCheckToken = (token) => {
  return async (dispatch) => {
    try {

      const response = axios(`${import.meta.env.VITE_BACK_BASE_URL}/auth`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      console.log('response', response)
      let res = await response.data

      console.log('response postCheckToken', res)

      dispatch({type: SET_USER_DATA, payload: response})

      return response

    } catch (error) {
      console.error('Error al realizar la solicitud postCheckToken:', error);
      return error.response

    }
  };
};