import axios from "axios";
import { BASE_URL } from '../../action-type';

export const issuePost = ({ titleDesc, descripcion, projectId, issueId }) => {

  const bodyData = {
    "fields": {
      "project": {
        "id": `${projectId}`
      },
      "summary": `${titleDesc}`,
      "description": {
        "type": "doc",
        "version": 1,
        "content": [
          {
            "type": "paragraph",
            "content": [
              {
                "text": descripcion,
                "type": "text"
              }
            ]
          }
        ]
      },
      "reporter": {
        "id": "712020:8a4ac3e0-8800-405a-96a0-a09c82e1a727"
      },
      "issuetype": {
        "id": `${issueId}`
      }
    }
  }
  return async () => {
    try {
      const response = await axios.post(`${BASE_URL}/incident/api/notify-incident`, bodyData)
      if (response.status === 200) {
        alert("Su incidencia fue creada con exito")
      }
      //return dispatch({ type: POST_ISSUE, payload: response.issues })

    } catch (error) {
      console.error('Error al realizar la solicitud:', error);

    }
  };
}