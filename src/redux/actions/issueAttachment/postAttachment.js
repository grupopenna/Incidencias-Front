import axios from "axios";
import { BASE_URL } from "../../action-type";

export const postAttachment = ({ fileContent }) => {

  const bodyData = {
    "file": {
      "value": fileContent,
      "options": {
        "filename": "file.txt",
        "contentType": "application/octet-stream",
      },
    },
  }

  return async () => {
    try {
      const response = await axios.post(`${BASE_URL}/file`, bodyData)
      console.log('response', response)
    } catch (error) {
      console.error("Error al realizar la solicitud postAttachment:", error);

    }
  };
}