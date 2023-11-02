import axios from "axios";
import { BASE_URL } from '../../action-type';
import { getIssue } from "./getIssue";

export const issuePost = ({ titleDesc, descripcion, projectId, issueId, IssueKey }, userId) => {

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
        await getIssue(`${IssueKey}`, userId)(dispatch)
        alert("Su incidencia fue creada con exito")
        window.history.back()
      }

    } catch (error) {
      console.error('Error al realizar la solicitud:', error);

    }
  };
}