import axios from "axios";
import { BASE_URL, GET_TRANSITIONS } from "../../action-type";



const HIDDEN_TRANSITIONS = {
  RECURRENTES: 'recurrentes',
  CERRADAS: 'cerrado'
}

const sortedTransition = (a, b) => {
  const transitionA = a?.to?.name?.toLowerCase() 
  const transitionB = b?.to?.name?.toLowerCase()

  if (transitionA === 'validado') return 1

  if (transitionA === 'sin priorizar') return -1

  if (transitionA === 'priorizado') {

    if (transitionB === 'sin priorizar') return 1

    return -1
  }

  if (transitionA === 'validar') {
    if (transitionB === 'validado') return -1

    return 1
  }

  if (transitionA === 'en proceso') {
    if (transitionB === 'sin priorizar' || transitionB === 'priorizado') return 1

    return -1
  }
}

export const getTransitions = (key) => {
  return async (dispatch) => {
    try {
      const response = (await axios.get(`${BASE_URL}/transitions/${key}`)).data;

      const transitionOrder = response.transitions.length > 3 
        ? response.transitions
            ?.sort(sortedTransition)
            .filter(item => item?.to?.name?.toLowerCase() !== HIDDEN_TRANSITIONS.CERRADAS && item?.to?.name?.toLowerCase() !== HIDDEN_TRANSITIONS.RECURRENTES ) 
        : response.transitions

      dispatch({ type: GET_TRANSITIONS, payload: transitionOrder })

    } catch (error) {
      console.log('error en getTransitions', error);

    }
  }
}