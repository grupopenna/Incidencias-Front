import axios from "axios";
import { BASE_URL } from "../../action-type";

export const postAttachments = (file, key) => {
  const formData = new FormData();
  return async function () {
    if (file.length > 0) {
      try {
        file.forEach((file) => {
          formData.append('files', file)
        })

        const response = await axios.post(`${BASE_URL}/incident/newAttachment/${key}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        console.log('RES-FIL', response)
        return response
      } catch (error) {
        console.error('Error al realizar la solicitud postAttachment:', error);
      }
    }
  }
};
