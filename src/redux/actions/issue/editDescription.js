import axios from "axios";
import { BASE_URL, EDIT_DESC } from '../../action-type'

export const editDescription = (key, newValue) => {
  const data = {
    newValue
  }
  return async (dispatch) => {
    try {
      const response = await axios.put(`${BASE_URL}/incident/edit-desc/${key}`, data)

      console.log(response.data)
      dispatch({ type: EDIT_DESC, payload: response.data })
    } catch (err) {
      console.error('Error al realizar la peticion')
    }
  }
} 