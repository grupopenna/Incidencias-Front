import axios from "axios";
import { BASE_URL } from "../../action-type";

export const postAttachments = async (file, key) => {
  console.log('first', file);

  try {
    const formData = new FormData();
    console.log('formData', formData)
    formData.append('file', file[0]);
    console.log('formData', formData)

    const response = await axios.post(`${BASE_URL}/incident/attachment/${key}`, formData, {
      headers: {
        'Content-Type': file[0].type,
      },
    });

    if (response.status === 200) {
      console.log('Archivo subido exitosamente:', response.data);
      return response.data;
    } else {
      console.error('Error al subir el archivo. Estado de respuesta:', response.status);
    }
  } catch (error) {
    console.error('Error al realizar la solicitud postAttachment:', error);
  }
};
