import axios from "axios";
import {  BASE_URL, GET_BOARD } from '../../action-type';

export const getBoard = () => {

  return async (dispatch) => {
    try {
      const response = (await axios.get(`${BASE_URL}/board/search`)).data;

      dispatch({type: GET_BOARD, payload: response})

      return response
    } catch (error) {
      console.log('Error al realizar la solicitud getIssue');

    }
  };
};