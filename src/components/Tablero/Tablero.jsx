/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unknown-property */

import { BOARD_STATUS } from "../../const";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { getIssue } from "../../redux/actions/issue/getIssue";
import { GlobalContext } from "../../context";
import { postTransition, putOrder } from "../../redux/actions";
import { ReloadIcon } from "../Icons";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState, useContext } from "react";
import { useIncidents } from "../../hooks/useIncidents";
import { useLocation, useNavigate } from "react-router-dom";
import Incident from "../Incident/Incident";
import Loader from "../Loader";
import Modal from "../Modal/Modal";
import Swal from "sweetalert2";


const Tablero = () => {
  const [modalShow, setModalShow] = useState(false);
  const [itemSelect, setItemSelect] = useState({});
  const { setReload } = useContext(GlobalContext)
  const location = useLocation();
  const { pathname } = location;
  const keyPathname = pathname.split('/').slice(-1);
  const { incidents } = useIncidents(keyPathname[0])
  const { isLoading } = useContext(GlobalContext)
  const transitions = useSelector((state) => state.transitions);
  const { jiraAccountId } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [worklog, setWorklog] = useState(false);


  useEffect(() => {
    if (keyPathname[0] == "ERP") {
      setWorklog(true);
    }
  }, [])

  const getList = (list) => {
    let filterList = incidents.filter((incident) => incident.fields.status.name == list)
    return filterList
  }

  const onDragEnd = async (result) => {
    const list = getList(result.source.droppableId);

    if ((result.source.droppableId == BOARD_STATUS.SIN_PRIORIZAR || result.source.droppableId == BOARD_STATUS.PRIORIZADO)
      && (result.destination.droppableId == BOARD_STATUS.SIN_PRIORIZAR || result.destination.droppableId == BOARD_STATUS.PRIORIZADO)) {

      const idList = list.map((item) => item.key)

      if (result.source.droppableId != result.destination.droppableId) {

        const originalDepature = result.source.droppableId
        const issueIndex = incidents.findIndex((incident) => incident.key === result.draggableId)

        incidents[issueIndex].fields.status.name = result.destination.droppableId

        await postTransition(result.destination.droppableId, result.draggableId)(dispatch).then(async (response) => {
          console.log('response', response)
          await getIssue(keyPathname[0], jiraAccountId)(dispatch).then((response) => {
            console.log('response', response)
            return console.log('response SelectedIncident getIssue', response);
          }).catch((error) => { throw error });
        }).catch((error) => {
          console.log('error', error)
          incidents[issueIndex].fields.status.name = originalDepature
          return
        })

      } else {
        let reorder = move(idList, result.source.index, result.destination.index);

        const bodyData = {
          "issues": reorder,
          "rankBeforeIssue": result.draggableId
        }

        await putOrder(bodyData)(dispatch)
      }

    } else if (result.source.droppableId == "Validar" && result.destination.droppableId == "Validado") {


      const originalDepature = result.source.droppableId
      const issueIndex = incidents.findIndex((incident) => incident.key === result.draggableId)

      incidents[issueIndex].fields.status.name = result.destination.droppableId

      incidents[issueIndex].fields.status.name = result.destination.droppableId
      await postTransition(result.destination.droppableId, result.draggableId)(dispatch).then((response) => {
        console.log('response', response)
      }).catch((error) => {
        console.log('error', error)
        incidents[issueIndex].fields.status.name = originalDepature
      })
    } else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Movimiento no permitido!!",
      });
    }
  }

  const move = (list, actualIndex, newIndex) => {
    const keys = new Set(list);
    const filteredKeys = incidents.filter((incident) => keys.has(incident.key));

    const [elemento] = filteredKeys.splice(actualIndex, 1);
    const [el] = list.splice(actualIndex, 1)

    filteredKeys.splice(newIndex, 0, elemento);
    list.splice(newIndex, 0, el)

    const othersValues = []

    const copyValues = [...incidents]

    for (let index = 0; index < copyValues.length; index++) {
      if (!keys.has(copyValues[index].key)) {
        othersValues.push(copyValues[index])
      }

      incidents.pop()
    }

    incidents.push(...[...filteredKeys, ...othersValues])

    return list;
  }

  const getItemStyle = (draggableStyle) => ({
    userSelect: "none",
    ...draggableStyle
  });

  const handleNotify = () => {
    navigate(`/createIssue/form/${keyPathname[0]}/`)
  }


  if (isLoading) {
    return <Loader />
  }

  return (
    <div className="flex flex-col w-full mx-5">
      {modalShow && <Modal setModalShow={setModalShow} itemSelect={itemSelect} worklog={worklog} />}

      <div className="flex items-center gap-x-2  my-5">
        <button onClick={() => { handleNotify() }} className="bg-indigo-600 w-44 py-2 rounded-md text-white">Notificar Incidencias</button>
        {!pathname.includes('view-all-incidents') && <button
          onClick={() => navigate("/view-all-incidents/12")}
          className="rounded-md bg-gradient-to-br from-indigo-700 via-indigo-600 to-indigo-500 px-5 py-2 text-base font-medium text-white transition duration-200 hover:shadow-lg hover:shadow-[#6025F5]/50">
          Ver todas las incidencias
        </button>}

        {pathname.includes('board') &&
          <button
            onClick={() => setReload(true)}
            aria-label="reload"
            className=" bg-gradient-to-br from-indigo-700 via-indigo-600 to-indigo-500 px-4 py-2  rounded-md text-white transition duration-200 hover:shadow-lg hover:shadow-[#6025F5]/50">
            <ReloadIcon />
          </button>}
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
