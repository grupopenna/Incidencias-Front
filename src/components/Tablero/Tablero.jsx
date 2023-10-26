/* eslint-disable react/no-unknown-property */
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Modal from "../Modal/Modal";
import Incident from "../Incident/Incident";
import { getIssue } from "../../redux/actions/issue/getIssue";
import { postTransition, putOrder } from "../../redux/actions";
import { useLocation, useNavigate } from "react-router-dom";

const Tablero = () => {

  const [modalShow, setModalShow] = useState(false)
  const [itemSelect, setItemSelect] = useState({})
  const incidents = useSelector((state) => state.incients);
  const transitions = useSelector((state) => state.transitions);
  const [reload, setReload] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation()
  const { pathname } = location;
  const keyPathname = pathname.split('/').slice(-1)
  const navigate = useNavigate();

  console.log('incidents', incidents)

  useEffect(() => {
    getIssue()
  }, [])

  useEffect(() => {
    if (reload) {
      getIssue()
      setReload
    }
  }, [reload])

  const getList = (list) => {
    let filterList = incidents.filter((incident) => incident.fields.status.name == list)
    return filterList
  }

  const onDragEnd = async (result) => {

    console.log('result', result);
    const list = getList(result.source.droppableId);

    if ((result.source.droppableId == "Sin Priorizar" || result.source.droppableId == "Priorizado") && (result.destination.droppableId == "Sin Priorizar" || result.destination.droppableId == "Priorizado")){
      
      const idList = list.map((item) => item.key)

      if (result.source.droppableId != result.destination.droppableId){
        await postTransition(result.destination.droppableId, result.draggableId)(dispatch).then((response) => {
        console.log('response', response)
      }).catch((error) => {
        console.log('error', error)
      })

      }

      let reorder = move(idList, result.source.index, result.destination.index);

      const bodyData = {
        "issues": reorder,
        "rankBeforeIssue": result.draggableId
      }

      await putOrder(bodyData)(dispatch).then((response) => {
        console.log('response', response)
      }).catch((error) => {
        console.log('error', error)
      })

    } else if(result.source.droppableId == "Validar" && result.destination.droppableId == "Validado"){

      await postTransition(result.destination.droppableId, result.draggableId)(dispatch).then((response) => {
        console.log('response', response)
      }).catch((error) => {
        console.log('error', error)
      })
    } else {
      alert('movivmiento no permitido')
    }

  }

  const move = (list, actualIndex, newIndex)=>{
    console.log('list', list)
    console.log('actualIndex', actualIndex)
    console.log('nextIndex', newIndex)
    const [elemento] = list.splice(actualIndex, 1);

  // Inserta el elemento en la nueva posición
  list.splice(newIndex, 0, elemento);

  // Devuelve la lista modificada
  return list;
  }


  const getItemStyle = (isDragging, draggableStyle) => ({
    userSelect: "none",
    ...draggableStyle
  });


  const handleNotify = () => {
    const issueId = incidents[0].fields.issuetype.id
    navigate(`/createIssue/form/${keyPathname[0]}/${issueId}`)
  }

  return (
    <div className="flex flex-col">
      {modalShow && <Modal setModalShow={setModalShow} itemSelect={itemSelect} />}

        <button onClick={() => { handleNotify() }} className="bg-buttonBg w-44 h-10 rounded-md my-2">Notificar Incidencias</button>

      <div className="flex gap-x-5">
        <DragDropContext onDragEnd={onDragEnd} className="flex">
          {transitions.map((transition) => (
            <Droppable key={transition.id} droppableId={`${transition.to.name}`} className="bg-bgColumn rounded-2xl pt-5 my-6 min-h-full w-5/6">
              {(provided) => (
                <div ref={provided.innerRef} {...provided.droppableProps} className=" bg-bgColumn w-1/3 ">
                  <h1 className="p-3 font-bold text-font">{transition.to.name}</h1>
                  {getList(transition.to.name).map((item, index) => (
                    <button key={item.id} onClick={() => { setModalShow(true), setItemSelect(item) }} className="w-full">
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided, snapshot) => (
                            <Incident 
                              item={item} 
                              innerRef={provided.innerRef}
                              {...provided.draggableProps} 
                              {...provided.dragHandleProps}  
                              style={getItemStyle(
                              snapshot.isDragging,
                              provided.draggableProps.style,
                          )}/>
                          )}
                      </Draggable>
                    </button>
                  ))}

                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          ))}
        </DragDropContext>
      </div>
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