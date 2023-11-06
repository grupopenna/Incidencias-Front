import axios from "axios";
import { BASE_URL } from '../../action-type';

export const deleteAttachments = (key, attachmentId) => {

  return async () => {
    try {
      const response = (await axios.delete(`${BASE_URL}/incident/deleteAttachments/${key}/${attachmentId}`));
      console.log('RED', response)
    } catch (error) {
      console.log('Error al realizar la solicitud deleteAttachments');

    }
  };
}