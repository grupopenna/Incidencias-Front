import axios from "axios";
import { BASE_URL } from '../../action-type';

export const postComments = () => {

  const bodyData = {
    "body": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque eget venenatis elit. Duis eu justo eget augue iaculis fermentum. Sed semper quam laoreet nisi egestas at posuere augue semper.",
    "visibility": {
      "identifier": "Administrators",
      "type": "role",
      "value": "Administrators"
    }
  }
  return async () => {
    try {
      const response = await axios.post(`${BASE_URL}/incident/newComments`, bodyData)
      if (response.status === 200) {
        alert("Su incidencia fue creada con exito")
      }
      //return dispatch({ type: POST_ISSUE, payload: response.issues })

    } catch (error) {
      console.error('Error al realizar la solicitud:', error);

    }
  };
}