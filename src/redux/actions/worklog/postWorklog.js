import axios from "axios";
import { BASE_URL } from '../../action-type';

export const postWorklog = (comment, time, date, key, userId) => {

  let bodyData = {
    "comment": {
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
        ],
        "type": "doc",
        "version": 1
    },
    "started": date,
    "timeSpentSeconds": time
}

  return async () => {
    try {
      const response = (await axios.post(`${BASE_URL}/worklog/newWorklog/${key}`, bodyData));
      return response.data
    } catch (error) {
      console.log('Error al realizar la solicitud postWorklog');
    }
  };
};