import axios from "axios";
import { BASE_URL, NEW_COMMENT } from '../../action-type';

export const postComments = (comment, key) => {

  const userId = "qm:c0387339-02b1-4e0d-8f36-3232066900ca:f89e19ff-d2a5-43bc-90b0-2e6bb8de636d"
  const userMail = "@carloh@penna.com.ar"
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
                            "text": userMail,
                            "accessLevel": "CONTAINER"
                        }
                    },
                    {
                        "type": "text",
                        "text": {comment}
                    }
                ]
            }
        ]
    },
    "issueId": `${key}`,
  }

  return async (dispatch) => {
    try {
      const response = await axios.post(`${BASE_URL}/incident/newComments`, bodyData)
      if (response.status === 200) {
        dispatch({ type: NEW_COMMENT, payload: response.data })
      }

    } catch (error) {
      console.error('Error al realizar la solicitud:', error);

    }
  }
}