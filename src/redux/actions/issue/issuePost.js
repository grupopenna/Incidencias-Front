import axios from "axios";
import { BASE_URL } from '../../action-type';
import { getIssue } from "./getIssue";

export const issuePost = ({ titleDesc, descripcion, projectId, issueId, IssueKey }) => {

  const userId = "712020:8a4ac3e0-8800-405a-96a0-a09c82e1a727"

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
        "id": `${userId}`
      },
      "issuetype": {
        "id": `${issueId}`
      }
    }
  }
  return async (dispatch) => {
    try {
      const response = await axios.post(`${BASE_URL}/incident/api/notify-incident`, bodyData)
      if (response.status === 200) {
        await getIssue(`${IssueKey}`)(dispatch)
        alert("Su incidencia fue creada con exito")
        window.history.back()
      }

    } catch (error) {
      console.error('Error al realizar la solicitud:', error);

    }
  };
}