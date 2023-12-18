import axios from "axios";
import { BASE_URL } from '../../action-type';
import { getIssueByKey } from "../issue/getIssueByKey";

export const deleteAttachments = (key, attachmentId) => {

  return async (dispatch) => {
    try {
      const response = (await axios.delete(`${BASE_URL}/incident/deleteAttachments/${key}/${attachmentId}`));
      if (response.status === 204) {
        await getIssueByKey(key)(dispatch)
      }
    } catch (error) {
      console.log('Error al realizar la solicitud deleteAttachments');

    }
  };
}