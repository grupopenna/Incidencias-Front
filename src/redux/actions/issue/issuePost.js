import axios from "axios";
import { BASE_URL } from '../../action-type';
import { getIssue } from "./getIssue";
import { postAttachments } from "../issueAttachment/postAttachments";
import Swal from "sweetalert2";

export const issuePost = ({ titleDesc, descripcion, projectId, issueId, IssueKey, file, }, userId) => {

  const bodyData = {
    "fields": {
      "project": {
        "id": `${projectId}`
      },
      "summary": `${titleDesc}`,
      "description": {
        "type": "doc",
        "version": 1,
        "content": descripcion
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
        let key = response.data.key
        try {
          if (file.length > 0) await postAttachments(file, key)(dispatch)
          await getIssue(`${IssueKey}`, userId)(dispatch)
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Su incidencia fue creada con exito!!",
            showConfirmButton: false,
            timer: 1800
          });
          window.history.back()
        } catch (error) {
          console.error('Error al realizar la solicitud postAttachments:', error);
        }

      }

    } catch (error) {
      console.error('Error al realizar la solicitud:', error);

    }
  };
}