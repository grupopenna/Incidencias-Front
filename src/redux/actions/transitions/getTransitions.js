import axios from "axios";
import { BASE_URL, GET_TRANSITIONS } from "../../action-type";

export const getTransitions = (key) => {

  return async (dispatch) => {
    try {
      const response = (await axios.get(`${BASE_URL}/transitions/${key}`)).data;

      dispatch({ type: GET_TRANSITIONS, payload: response.transitions })

    } catch (error) {
      console.log('error en getTransitions', error);

    }
  }
}