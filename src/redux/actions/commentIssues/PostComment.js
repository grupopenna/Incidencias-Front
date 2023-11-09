import axios from "axios";
import { BASE_URL, NEW_COMMENT } from '../../action-type';
import { formatJiraText } from "../../../utils";

export const postComments = (comment, key, userId) => {
  const bodyData = {
    "body": {
      "version": 1,
      "type": "doc",
      "content": [
        {
          "type": "paragraph",
          "content": [
            {
              "type": "mention",
              "attrs": {
                "id": userId,
                "accessLevel": "CONTAINER"
              }
            },
          ]
        },
        ...comment
      ]
    }
  }

  return async (dispatch) => {
    try {
      const response = await axios.post(`${BASE_URL}/incident/newComments/${key}`, bodyData)
      if (response.status === 200) {
        const { body:{ content }, author, updated  } = response.data
        const payload = formatJiraText(content, author, updated)
        dispatch({ type: NEW_COMMENT, payload: payload })
      }

    } catch (error) {
      console.error('Error al realizar la solicitud:', error);

    }
  }
}