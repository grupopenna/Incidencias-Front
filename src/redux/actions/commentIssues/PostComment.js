import axios from "axios";
import { BASE_URL, NEW_COMMENT } from '../../action-type';

export const postComments = (comment, key, userId) => {

  console.log('comment', comment)
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
                    {
                        "type": "text",
                        "text": comment
                    }
                ]
            }
        ]
    }
  }

  return async (dispatch) => {
    try {
      const response = await axios.post(`${BASE_URL}/incident/newComments/${key}`, bodyData)
      if (response.status === 200) {
        dispatch({ type: NEW_COMMENT, payload: response.data })
      }

    } catch (error) {
      console.error('Error al realizar la solicitud:', error);

    }
  }
}