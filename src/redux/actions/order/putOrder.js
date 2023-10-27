import axios from "axios";
import {  BASE_URL } from '../../action-type';

export const putOrder = async (orderData) => {
  console.log('orderData', orderData)

  try {
    const response = await axios.put(`${BASE_URL}/order`, orderData);

    return response

  } catch (error) {
    console.error('Error al realizar la solicitud putOrder:', error);

  }
}