import axios from "axios";
import { BASE_URL, GET_TRANSITIONS } from "../../action-type";

export const getTransitions = (key) => {
  return async (dispatch) => {
    try {
      const response = (await axios.get(`${BASE_URL}/transitions/${key}`)).data;
      //console.log('response.transitions', response.transitions)
      const orderScrum = (trans) => {

        if (key.includes("NR")) {
          return trans
        } else {

          return [
            trans.find((t) => t.to.name.toUpperCase() == "Tareas por hacer".toUpperCase()),
            trans.find((t) => t.to.name.toUpperCase() == "En curso".toUpperCase()),
            trans.find((t) => t.to.name.toUpperCase() == "Finalizada".toUpperCase())
          ];
        }
      };

      const orderKanban = (trans) => {
        if (key.includes("NR")) {
          return trans
        } else {
          let order = [
            trans.find((t) => t.to.name.toUpperCase() == "Sin Priorizar".toUpperCase()),
            trans.find((t) => t.to.name.toUpperCase() == "Priorizado".toUpperCase()),
            trans.find((t) => t.to.name.toUpperCase() == "En Proceso".toUpperCase()),
            trans.find((t) => t.to.name.toUpperCase() == "Validar".toUpperCase()),
            trans.find((t) => t.to.name.toUpperCase() == "Validado".toUpperCase())]

          return order
        }
      }

      const transitionOrder = response.transitions.length > 3 ? orderKanban(response.transitions) : orderScrum(response.transitions)

      dispatch({ type: GET_TRANSITIONS, payload: transitionOrder })

    } catch (error) {
      console.log('error en getTransitions', error);

    }
  }
}