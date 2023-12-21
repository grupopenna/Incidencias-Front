import axios from "axios";
import { BASE_URL } from '../../action-type';
import { getIssue } from "./getIssue";
import { postAttachments } from "../issueAttachment/postAttachments";
import Swal from "sweetalert2";
import { ISSUETYPE_COD } from "../../../const";

export const issuePost = ({ titleDesc, descripcion, projectId, issueId, IssueKey, file, companies, selectedIssue, isERP }, userId, area) => {
  const customField = selectedIssue === ISSUETYPE_COD.ERROR ? "customfield_10124" : "customfield_10108"
  const baseQuery = {
    "fields": {
    
      "project": {
        "id": `${projectId}`
      },
      "summary": `${titleDesc}`,
      "reporter": {
        "id": `${userId}`
      },
      "labels": [
        `${area}`
      ],
      "issuetype": {
        "id": `${issueId}`
      }
    }
  }

  const queryToErp = {
    "fields": {
      ...baseQuery.fields,
      [customField]: companies
    }
  }

  
  const bodyData = isERP ? queryToErp : baseQuery

  if (Array.isArray(descripcion)) {
    
    if (descripcion.length > 0 ) {
       bodyData.fields.description = {
        "type": "doc",
        "version": 1,
        "content": descripcion
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
      throw new Error('Error al realizar la solicitud')
    }
  };
}