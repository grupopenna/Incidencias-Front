/* eslint-disable react/no-unknown-property */
import { useDispatch, useSelector } from "react-redux";
import Incident from "../Incident/Incident";
import { useEffect, useState } from "react";
import { postTransition } from "../../redux/actions/transitions/postTransition";
import { getIssue } from "../../redux/actions/issue/getIssue";
import { useLocation, useNavigate } from "react-router-dom";

const Tablero = () => {
  const dispatch = useDispatch();
  const incidents = useSelector((state) => state.incients);
  const transitions = useSelector((state) => state.transitions);
  const [incident, setIncident] = useState(incidents);
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();

  console.log('incidents', incidents)

  const location = useLocation()
  const { pathname } = location;
  const keyPathname = pathname.split('/').slice(-1)

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

  const startDrag = (evt, item) => {
    evt.dataTransfer.setData('itemID', item.id)
  }

  const draggingOver = (evt) => {
    evt.preventDefault();
  }

  const onDrop = (evt, list) => {
    const itemID = evt.dataTransfer.getData('itemID');
    const item = incidents.find(item => item.id == itemID);

    const data = {
      id: item.id,
      list: list.to.name
    }

    postTransition(data)(dispatch).then((response) => {
      console.log('response', response)
    }).catch((error) => console.log('response tablero L38', error))
    item.list = list;

    const newState = incident.map(task => {
      if (task.id === itemID) return item;
      return task
    })

    setIncident(newState);
  }
  const handleNotify = () => {
    const issueId = incidents[0].fields.issuetype.id
    navigate(`/createIssue/form/${keyPathname[0]}/${issueId}`)
  }

  const handleReload = () => {
    setReload(true)
  }

  return (
    <div className="flex justify-center flex-col mx-20 mt-10">
      <div className="flex justify-around my-5">
        <button onClick={() => { handleNotify() }} className="bg-buttonBg w-44 h-10 rounded-md">Notificar Incidencias</button>
        <button onClick={() => { handleReload() }} className="">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="text-slate-100 w-6 h-6 bg-buttonBg p-3">
            <path d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99" />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-3 gap-3 mx-2">
        {
          transitions.map((transition) => <div droppable="true" key={transition.id} onDragOver={(evt => draggingOver(evt))} onDrop={(evt => onDrop(evt, transition))} className="border rounded-2xl px-8 py-5 min-h-full">
            <h1>{transition.to.name}</h1>
            {getList(transition.to.name).map((item, i) => (
              <div key={item.id} draggable onDragStart={(evt) => startDrag(evt, item)}>
                <Incident
                  key={item.fields.key}
                  id={item.id}
                  img={item.image}
                  title={item.fields.summary}
                  description={item.fields.description}
                  state={item.fields.status.name}
                  coments={item.fields.comment.comments}
                  responsable={item.fields?.assignee}
                  hsConsumidas={item.fields.timetracking.timeSpent}
                  hsEstimadas={item.fields.timetracking.remainingEstimate}
                  progress={item.process}
                  adjs={item.adjs}
                  priority={item[i]}
                />
              </div>
            ))}
          </div>)
        }
        {/* <div >
            <div droppable="true" onDragOver={(evt => draggingOver(evt))} onDrop={(evt => onDrop(evt, "Por hacer"))} className="border rounded-2xl px-8 py-5 min-h-full">
              {getList("Por hacer").map((item, i) => (
                <div key={item.id} draggable onDragStart={(evt) => startDrag(evt, item)}>
                  <Incident 
                    key={item.fields.key}
                    id={item.id}
                    img={item.image}
                    title={item.fields.summary}
                    description={item.fields.summary}
                    state={item.fields.status.name}
                    coments={item.fields.comment.comments}
                    responsable={item.fields?.assignee}
                    hsConsumidas={item.fields.timetracking.timeSpent}
                    hsEstimadas={item.fields.timetracking.remainingEstimate}
                    progress={item.process}
                    adjs={item.adjs}
                    priority={item[i]}
                  />
                  </div>
              ))}
            </div>
          </div>
          <div>
            <div droppable="true" onDragOver={(evt => draggingOver(evt))} onDrop={(evt => onDrop(evt, "En curso"))} className="border rounded-2xl  px-8 py-5 min-h-full">
              {getList("En curso").map((item, i)=> (
                <div  key={item.id} draggable onDragStart={(evt) => startDrag(evt, item)}>
                  <Incident 
                    key={item.fields.key}
                    id={item.id}
                    img={item.image}
                    title={item.fields.summary}
                    description={item.fields.summary}
                    state={item.fields.status.name}
                    coments={item.fields.comment.comments}
                    responsable={item.fields.assignee}
                    hsConsumidas={item.fields.timetracking.timeSpent}
                    hsEstimadas={item.fields.timetracking.remainingEstimate}
                    progress={item.process}
                    adjs={item.adjs}
                    priority={item[i]}
                  />
                </div>
              ))}
            </div>
          </div>
          <div>
            <div droppable="true" onDragOver={(evt => draggingOver(evt))} onDrop={(evt => onDrop(evt, "Listo"))} className="border rounded-2xl  px-8 py-5 min-h-full">
              {getList("Listo").map((item, i)=> (
                <div key={item.id} draggable onDragStart={(evt) => startDrag(evt, item)}>
                  <Incident 
                    key={item.fields.key}
                    id={item.id}
                    img={item.image}
                    title={item.fields.summary}
                    description={item.fields.summary}
                    state={item.fields.status.name}
                    coments={item.fields.comment.comments}
                    responsable={item.fields.assignee}
                    hsConsumidas={item.fields.timetracking.timeSpent}
                    hsEstimadas={item.fields.timetracking.remainingEstimate}
                    progress={item.process}
                    adjs={item.adjs}
                    priority={item[i]}
                  />
                </div>
              ))}
            </div>
          </div> */}
      </div>
    </div>

  )
}

export default Tablero;