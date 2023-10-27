import axios from "axios";
import { BASE_URL } from "../../action-type";

export const postTransition = (idTransition, idIssue) => {
  return async () => {

    const bodyData = {
      "transition":  idTransition
    }

    try {
      const response = await axios.post(`${BASE_URL}/transitions/${idIssue}`, bodyData)
      console.log('response postTransition', response);

    } catch (error) {
      console.log('error postTransition', error);
    }
  }
}

