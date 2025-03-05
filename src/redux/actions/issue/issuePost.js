import axios from "axios";
import { BASE_URL } from '../../action-type';
import { getIssue } from "./getIssue";
import { postAttachments } from "../issueAttachment/postAttachments";
import Swal from "sweetalert2";
import { ISSUETYPE_COD } from "../../../const";

export const issuePost = (data, userId, area) => {
  const { titleDesc, descripcion, projectId, issueId, IssueKey, file, companies, selectedIssue, isERP, categoryError, dataTechnical } = data
  const userData = JSON.parse(localStorage.getItem('userData')) 
  const { email, fullName } =  userData
  const customField = Object.values(ISSUETYPE_COD).includes(selectedIssue) ? "customfield_10124" : "customfield_10108"
  /*
  10124 = trabag -- RESOL24

  10108 = nuevosReq - critic- TAREA
  */
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
      [customField]: companies,
      ["customfield_10143"]: [categoryError]
    }
  }

  
  const bodyData = isERP ? queryToErp : baseQuery

  if (Array.isArray(descripcion)) {
    const line1 = {
      "type": "paragraph",
      "content": [{
        text: "",
        type: "text"
      }]
    }
    descripcion.push(line1)

    if (selectedIssue === ISSUETYPE_COD.TRABAGESTION) {
      const line2 = {   
        "type": "paragraph",
        "content": [{
          text: `Links: ${dataTechnical.technicalName}`,
          type: "text"
        },
        {
          type: 'hardBreak'
        },
        {
          text: `Parametros usados: ${dataTechnical.params}`,
          type: "text"
        }
      ]
      }
      descripcion.push(line2)
    }

    const line3 = {   
      "type": "paragraph",
      "content": [{
        text: `Contactarse con: ${email}, ticket realizado por ${fullName}`,
        type: "text"
      }]
    }
    descripcion.push(line3)
    
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
          await getIssue(`${IssueKey}`, area)(dispatch)
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
