/* eslint-disable react/no-unknown-property */
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getIssue } from "../../redux/actions/issue/getIssue";
import Modal from "../Modal/Modal";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Incident from "../Incident/Incident";

const Tablero = () => {

  const [modalShow, setModalShow] = useState(false)
  const [itemSelect, setItemSelect] = useState({})
  const incidents = useSelector((state) => state.incients);
  const transitions = useSelector((state) => state.transitions);
  const [reload, setReload] = useState(false);

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

  const [state, setState] = useState([getList("Priorizado"), getList("En Proceso"), getList("Validar"), getList("Validado")]);

  function onDragEnd(result) {
    const { source, destination } = result;

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
    userSelect: "none",
    padding: grid * 2,
    margin: `0 0 ${grid}px 0`,

    background: isDragging ? "lightgreen" : "grey",

    ...draggableStyle
  });
  const getListStyle = isDraggingOver => ({
    background: isDraggingOver ? "lightblue" : "lightgrey",
    padding: grid,
    width: 250
  });

  return (
    <div>
      {modalShow && <Modal setModalShow={setModalShow} itemSelect={itemSelect} />}

      <div className="flex gap-x-5">
        <DragDropContext onDragEnd={onDragEnd}>
          {transitions.map((transition) => (
            <Droppable key={transition.id} droppableId={`${transition.to.name}`} className="bg-bgColumn rounded-2xl pt-5 min-h-full w-5/6">
              {(provided, snapshot) => (
                <div ref={provided.innerRef} style={getListStyle(snapshot.isDraggingOver)} {...provided.droppableProps}>
                  <h1 className="mx-2 mb-1 text-font">{transition.to.name}</h1>
                  {getList(transition.to.name).map((item, index) => (
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
                              {<Incident item={item} />}
                              {/* <p>{item.fields.summary}</p>
                                    <p>{item.key}</p> */}
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