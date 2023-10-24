import axios from "axios";
import {  BASE_URL } from '../../action-type';

export const putOrder = async () => {
  const orderData = {}

  try {
    const response = (await axios.post(`${BASE_URL}/order`, orderData)).data;

    return response

  } catch (error) {
    console.error('Error al realizar la solicitud putOrder:', error);

  }
}