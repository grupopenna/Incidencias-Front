/* eslint-disable react/no-unknown-property */
import { useSelector } from "react-redux";
// import Incident from "../Incident/Incident";
import { useEffect, useState } from "react";
// import { postTransition } from "../../redux/actions/transitions/postTransition";
import { getIssue } from "../../redux/actions/issue/getIssue";
// import { useLocation, useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd"; 

const Tablero = () => {
  
  // const [ listPriorizado, setListPriorizado] = useState(getList("Priorizado"))
  // const navigate = useNavigate();
  //const dispatch = useDispatch();
  const [modalShow, setModalShow] = useState(false)
  const [itemSelect, setItemSelect] = useState({})
  const incidents = useSelector((state) => state.incients);
  const transitions = useSelector((state) => state.transitions);
  // const [incident, setIncident] = useState(incidents);
  const [reload, setReload] = useState(false);
  // const navigate = useNavigate();

  console.log('incidents', incidents)

  // const location = useLocation()
  // const { pathname } = location;
  // const keyPathname = pathname.split('/').slice(-1)

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

  // const [ listSinPriorizar, setListSinPriorizar] = useState(getList("Sin Priorizar"))
  // console.log('listSinPriorizar', listSinPriorizar)
  const [state, setState] = useState([ getList("Priorizado"), getList("En Proceso"), getList("Validar"), getList("Validado") ]);

  function onDragEnd(result) {
    const { source, destination } = result;

    // dropped outside the list
    if (!destination) {
      return;
    }
    const sInd = +source.droppableId;
    const dInd = +destination.droppableId;

    if (sInd === dInd) {
      const items = reorder(state[sInd], source.index, destination.index);
      const newState = [...state];
      newState[sInd] = items;
      setState(newState);
    } else {
      const result = move(state[sInd], state[dInd], source, destination);
      const newState = [...state];
      newState[sInd] = result[sInd];
      newState[dInd] = result[dInd];

      setState(newState.filter(group => group.length));
    }
  }

  const reorder = (list, startIndex, endIndex) => {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);

    return result;
  };

  /**
   * Moves an item from one list to another list.
   */
  const move = (source, destination, droppableSource, droppableDestination) => {
    const sourceClone = Array.from(source);
    const destClone = Array.from(destination);
    const [removed] = sourceClone.splice(droppableSource.index, 1);

    destClone.splice(droppableDestination.index, 0, removed);

    const result = {};
    result[droppableSource.droppableId] = sourceClone;
    result[droppableDestination.droppableId] = destClone;

    return result;
  };
  const grid = 8;

  const getItemStyle = (isDragging, draggableStyle) => ({
    // some basic styles to make the items look a bit nicer
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    // change background colour if dragging
    background: isDragging ? "lightgreen" : "grey",

    // styles we need to apply on draggables
    ...draggableStyle
  });
  const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    width: 250
  });
  // const startDrag = (evt, item) => {
  //   evt.dataTransfer.setData('itemID', item.id)
  // }

  // const draggingOver = (evt) => {
  //   evt.preventDefault();
  // }

  // const onDrop = (evt, list) => {
  //   const itemID = evt.dataTransfer.getData('itemID');
  //   const item = incidents.find(item => item.id == itemID);

  //   const data = {
  //     id: item.id,
  //     list: list.to.name
  //   }

  //   postTransition(data)(dispatch).then((response) => {
  //     console.log('response', response)
  //   }).catch((error) => console.log('response tablero L38', error))
  //   item.list = list;

  //   const newState = incident.map(task => {
  //     if (task.id === itemID) return item;
  //     return task
  //   })

  //   setIncident(newState);
  // }

  // const handleNotify = () => {
  //   const issueId = incidents[0].fields.issuetype.id
  //   navigate(`/createIssue/form/${keyPathname[0]}/${issueId}`)
  // }

  // const handleReload = () => {
  //   setReload(true)
  // }


  return (
    // <div className="flex justify-center flex-col w-full mx-4">
    //   {modalShow && <Modal setModalShow={setModalShow} itemSelect={itemSelect} />}
    //   <div className="flex justify-around my-5">
    //     <button onClick={() => { handleNotify() }} className="bg-buttonBg w-44 h-10 rounded-md">Notificar Incidencias</button>
    //     <button onClick={() => { handleReload() }} className="">
    //       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-slate-100 w-6 h-6 bg-buttonBg p-3">
    //         <path d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
    //       </svg>
    //     </button>
    //   </div>
    //   <div className="flex gap-x-3 w-full">
    //     {
    //       transitions.map((transition) => <div key={transition.id} className="bg-bgColumn rounded-2xl pt-5 min-h-full w-5/6">
    //         <h1 className="mx-2 mb-1 text-font">{transition.to.name}</h1>
    //         {getList(transition.to.name).map((item) => (

    //           <div key={item.id} className="flex justify-center mx-2 ">
    //             <button onClick={() => { setModalShow(true), setItemSelect(item) }}>
    //               <Incident
    //                 item={item}
    //               />
    //             </button>
    //           </div>
    //         ))}
    //       </div>)
    //     }
    //   </div>
    // </div>
    <div>
      {modalShow && <Modal setModalShow={setModalShow} itemSelect={itemSelect} />}
      {/* <div>
        <Droppable  droppableId={`SinPriorizar`}>
          {listSinPriorizar.map((item) => 
          <h1 key={item.key}>{item.id}</h1>
          )}
        </Droppable>
        
      </div> */}
      <div className="flex gap-x-5">
        <DragDropContext onDragEnd={onDragEnd}>
          {transitions.map((transition) => (
            <Droppable key={transition.id} droppableId={`${transition.to.name}`} className="bg-bgColumn rounded-2xl pt-5 min-h-full w-5/6">
              {(provided, snapshot) => (
                <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)} {...provided.droppableProps}>
                  <h1 className="mx-2 mb-1 text-font">{transition.to.name}</h1>
                  {getList(transition.to.name).map((item, index) => (
                    //   <div key={item.id} className="flex justify-center mx-2 ">
                    //     <button onClick={() => { setModalShow(true), setItemSelect(item) }}>
                    //       <Incident
                    //         item={item}
                    //       />
                    //     </button>
                    //   </div>
                    // ))}git
                    <button key={item.id} onClick={() => { setModalShow(true), setItemSelect(item) }} className="w-full">
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                          {(provided, snapshot) => (
                              <div ref={provided.innerRef} {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  style={getItemStyle(
                                      snapshot.isDragging,
                                      provided.draggableProps.style
                                  )}
                              >
                                  <div className="flex flex-col w-full">
                                    <p>{item.fields.summary}
                                    </p>
                                    <p>{item.key}</p>
                                  </div>
                              </div>
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