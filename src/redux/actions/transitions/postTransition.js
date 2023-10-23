import axios from "axios";
import { BASE_URL } from "../../action-type";

export const postTransition = (bodyData) => {
  return async () => {

    try {
      const response = (await axios.post(`${BASE_URL}/transitions/`, bodyData)).data
      console.log('response', response)

    } catch (error) {
      console.log('error', error)
    }
  }
}

