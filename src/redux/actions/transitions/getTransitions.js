import axios from "axios";
import { BASE_URL, GET_TRANSITIONS } from "../../action-type";

export const getTransitions = (key) => {
  return async (dispatch) => {
    try {
      const response = (await axios.get(`${BASE_URL}/transitions/${key}`)).data;
      console.log('response.transitions', response.transitions)
      const orderScrum = (trans) => {

        if (key.includes("NR")){
          return trans
        } else {

          return [
            trans.find((t) => t.to.name == "Tareas por hacer"), 
            trans.find((t) => t.to.name == "En curso"), 
            trans.find((t) => t.to.name == "Finalizada")
          ];
        }
      };
    
      const orderKanban  = (trans) => {
        if (key.includes("NR")){
          return trans
        } else {
          let order = [
          trans.find((t) => t.to.name == "Sin Priorizar"),
          trans.find((t) => t.to.name == "Priorizado"),
          trans.find((t) => t.to.name == "En Proceso"),
          trans.find((t) => t.to.name == "Validar"), 
          trans.find((t) => t.to.name == "Validado")]
          
          return order
        }
      }

      console.log('response.transition', response.transitions)

      const transitionOrder = response.transitions.length > 3 ? orderKanban(response.transitions)  : orderScrum(response.transitions)


      dispatch({ type: GET_TRANSITIONS, payload: transitionOrder})

    } catch (error) {
      console.log('error en getTransitions', error);

    }
  }
}