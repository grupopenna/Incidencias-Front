/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Modal from "../Modal/Modal";
import Incident from "../Incident/Incident";
import { getIssue } from "../../redux/actions/issue/getIssue";
import { postTransition, putOrder } from "../../redux/actions";
import { useLocation, useNavigate } from "react-router-dom";
import { AlertIcon } from "../Icons";

const BOARD_STATUS = {
  SIN_PRIORIZAR: "Sin Priorizar",
  PRIORIZADO: "Priorizado"
}

const Tablero = () => {

  // const [ listPriorizado, setListPriorizado] = useState(getList("Priorizado"));
  // const navigate = useNavigate();
  //const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false);
  const [itemSelect, setItemSelect] = useState({});
  const incidents = useSelector((state) => state.incients);
  const transitions = useSelector((state) => state.transitions);
  const [reload, setReload] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const { pathname } = location;
  const keyPathname = pathname.split('/').slice(-1)
  const navigate = useNavigate();

  useEffect(() => {
    getIssue()
  }, [])

  useEffect(() => {
    if (reload) {
      getIssue()
      setReload
    }
  }, [reload])

  // const orderScrum = (transition) => {
  //   return [transition.find((t) => t.name == "Por hacer"), 
  //   transition.find((t) => t.name == "En curso"), 
  //   transition.find((t) => t.name == "Listo")]
  // }

  // const orderKanban  = (transition) => {

  //   return [transition.find((t) => t.to.name == "Sin Priorizar"), 
  //   transition.find((t) => t.to.name == "Priorizado"), 
  //   transition.find((t) => t.to.name == "En Proceso"), 
  //   transition.find((t) => t.to.name == "Validar"), 
  //   transition.find((t) => t.to.name == "Validado")]
  // }

  // const transitions = transitionState.length == 3 && keyPathname != "NR" ? orderScrum(transitionState) : orderKanban(transitionState)

  const getList = (list) => {
    let filterList = incidents.filter((incident) => incident.fields.status.name == list)
    return filterList
  }

  const onDragEnd = async (result) => {
    //console.log('result', result);
    const list = getList(result.source.droppableId);

    if ((result.source.droppableId == BOARD_STATUS.SIN_PRIORIZAR|| result.source.droppableId == BOARD_STATUS.PRIORIZADO)
       && (result.destination.droppableId == BOARD_STATUS.SIN_PRIORIZAR || result.destination.droppableId == BOARD_STATUS.PRIORIZADO)) {

      const idList = list.map((item) => item.key)

      if (result.source.droppableId != result.destination.droppableId) {
        console.log('result.destination.droppableId', result.destination.droppableId)
        console.log('result.draggableId', result.draggableId)

        await postTransition(result.destination.droppableId, result.draggableId)(dispatch).then(async (response) => {
          console.log('response', response)
          await getIssue(keyPathname[0])(dispatch).then((response) => {
            console.log('response', response)
            return console.log('response SelectedIncident getIssue', response);
          }).catch((error) => { throw error });
        }).catch((error) => {
          console.log('error', error)
          return
        })

      } else {
        let reorder = move(idList, result.source.index, result.destination.index);

        const bodyData = {
          "issues": reorder,
          "rankBeforeIssue": result.draggableId
        }

        await putOrder(bodyData)(dispatch).then(async (response) => {
          console.log('response', response)

        }).catch((error) => {
          console.log('error', error)
        })
      }

    } else if (result.source.droppableId == "Validar" && result.destination.droppableId == "Validado") {

      await postTransition(result.destination.droppableId, result.draggableId)(dispatch).then((response) => {
        console.log('response', response)
      }).catch((error) => {
        console.log('error', error)
      })
    } else {
      alert('movivmiento no permitido')
    }
  }

  const move = (list, actualIndex, newIndex) => {
    console.log('list', list)
    console.log('actualIndex', actualIndex)
    console.log('nextIndex', newIndex)
    const [elemento] = list.splice(actualIndex, 1);

    // Inserta el elemento en la nueva posición
    list.splice(newIndex, 0, elemento);

    // Devuelve la lista modificada
    return list;
  }


  const getItemStyle = (draggableStyle) => ({
    userSelect: "none",
    ...draggableStyle
  });

  const handleNotify = () => {
    navigate(`/createIssue/form/${keyPathname[0]}/`)
  }

  const AlertMessage = () => {
    if (keyPathname[0] === 'CFS' || keyPathname[0] === 'CMS') {
      return (
        <div className="flex items-center rounded-lg pl-2 bg-bgIncident">
          <AlertIcon />
          <span className="text-white">Si su tarjeta no esta revise los mail ó</span>
          <button onClick={() => navigate(`/proxSprint/${keyPathname}`)} className="px-3 py-1">
            <span className="text-buttonBg hover:underline">Haga click aqui</span>
          </button>
        </div>
      )
    }
  }

  return (
    <div className="flex flex-col w-full mx-5">
      {modalShow && <Modal setModalShow={setModalShow} itemSelect={itemSelect} />}
      <div className="flex my-5 justify-between">
        <button onClick={() => { handleNotify() }} className="bg-buttonBg w-44 h-10 rounded-md">Notificar Incidencias</button>
        {/* <button onClick={() => { handleReload() }} className="">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-slate-100 w-6 h-6 bg-buttonBg p-3">
              <path d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
        </button> */}
        <AlertMessage />

      </div>
      {incidents?.length > 0 ?
        <div className="flex gap-x-2">
          {keyPathname == "NR" ? (
            transitions.map((transition, i) => (
              <div key={i} className=" bg-bgColumn rounded-lg w-1/3 flex flex-col px-1">
                <h1 className="p-3 font-bold text-font">{transition.to.name}</h1>
                {getList(transition.to.name).map((item) => (
                  <button key={item.id} onClick={() => { setModalShow(true), setItemSelect(item) }} className="w-full flex ">
                    <Incident
                      item={item}
                    />
                  </button>
                ))}
              </div>
            ))
          )
            : (
              <DragDropContext onDragEnd={onDragEnd} className="flex">
                {transitions.map((transition) => (
                  <Droppable key={transition.id} droppableId={`${transition.to.name}`} className="min-h-full w-5/6">
                    {(provided) => (
                      <div ref={provided.innerRef} {...provided.droppableProps} className=" bg-bgColumn rounded-lg w-1/3 flex flex-col px-1">
                        <h1 className="p-3 font-bold text-font">{transition.to.name}</h1>
                        {getList(transition.to.name).map((item, index) => (
                          <button key={item.id} onClick={() => { setModalShow(true), setItemSelect(item) }} className="w-full flex ">
                            {transition.to.name != "En Proceso" ? (
                              <Draggable key={item.key} draggableId={item.key} index={index}>
                                {(provided) => (
                                  <Incident
                                    item={item}
                                    innerRef={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    style={getItemStyle(
                                      provided.draggableProps.style
                                    )} />
                                )}
                              </Draggable>)
                              : <Incident
                                item={item}
                                innerRef={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
                              />
                            }
                          </button>
                        ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                ))
                }
              </DragDropContext>)}
        </div>
        :
        <div className="text-center">
          <h2 className="text-white">Aún no se informaron incidencias para este modulo</h2>
        </div>
      }
    </div>
  )
}

export default Tablero;

// if (!destination) {
//   return;
// }
// const sInd = +source.droppableId;
// const dInd = +destination.droppableId;

// if (sInd === dInd) {
//   const items = reorder(state[sInd], source.index, destination.index);
//   const newState = [...state];
//   newState[sInd] = items;
//   setState(newState);
// } else {
//   const result = move(state[sInd], state[dInd], source, destination);
//   const newState = [...state];
//   newState[sInd] = result[sInd];
//   newState[dInd] = result[dInd];

//   setState(newState.filter(group => group.length));
// }

// const reorder = (list, startIndex, endIndex) => {
//   const result = Array.from(list);
//   const [removed] = result.splice(startIndex, 1);
//   result.splice(endIndex, 0, removed);
//   return result;
// };