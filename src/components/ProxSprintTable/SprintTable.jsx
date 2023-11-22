import { useEffect, useState } from "react"
import { getIssueByUser, getTransitions } from "../../redux/actions"
import { useDispatch, useSelector } from "react-redux"
import Modal from "../Modal/Modal";
import { WithoutPhoto } from "../Icon";
import { useLocation } from "react-router-dom";

const SprintTable = () => {

  const dispatch = useDispatch()
  const incidents = useSelector((state) => state.incients);
  const transitions = useSelector((state) => state.transitions);
  const { jiraAccountId } = useSelector((state) => state.user);
  const [view, setView] = useState(false)
  const [modalShow, setModalShow] = useState(false)
  const [itemSelect, setItemSelect] = useState({})
  const location = useLocation()
  const { pathname } = location;
  const [issueId] = pathname.split('/').slice(-1)
  const issueDev = issueId.slice(0, -1)

  useEffect(() => {
    solicitud()
  }, [])

  const solicitud = async () => {
    await getIssueByUser(`${issueDev}D`, jiraAccountId)(dispatch).then(async (response) => {
      if (response === undefined || response.length === 0) setView(true)
      await getTransitions(response[0].key)(dispatch)
    })
    setView(true)
  }

  const getList = (list) => {
    let filterList = incidents.filter((incident) => incident.fields.status.name === list)
    return filterList
  }

  return (
    <>
      {view ?
        (
          <div className="flex flex-col w-full p-5">
            {modalShow && <Modal setModalShow={setModalShow} itemSelect={itemSelect} />}
            <div className="flex gap-x-2">
              {transitions.map((tr, index) => (
                <div key={index} className=" bg-bgColumn rounded-lg w-1/3 flex flex-col px-1">
                  <h1 className="p-3 font-bold text-font">{tr.name}</h1>
                  {getList(tr.name).map((item, index) => (
                    <button key={index} onClick={() => { setModalShow(true), setItemSelect(item) }} className="w-full flex ">
                      <div className="h-40 w-full my-2 mx-1 rounded-md bg-bgIncident flex justify-end items-center flex-col text-font">
                        <div className="w-full">
                          <p className="text-font font-bold text-lg">{item.fields.summary}</p>
                        </div>
                        <p>{item.fields.timetracking?.timeSpent}</p>
                        <div className="w-full h-1/2 items-end justify-between p-2 flex">
                          <div className="flex items-center gap-2">
                            <img src={item?.fields.issuetype?.iconUrl} alt="Imagen del icono del proyecto de jira" className="w-4 h-4" />
                            <p className="text-base">{item.key}</p>
                          </div>
                          {item?.fields?.assignee?.avatarUrls ?
                            <img
                              className="w-6 h-6"
                              src={item?.fields?.assignee?.avatarUrls['16x16']}
                              alt={`persona asignada ${item?.fields?.assignee?.displayName}`}
                              aria-label={`persona asignada ${item?.fields?.assignee?.displayName}`} />
                            : <WithoutPhoto />
                          }
                        </div>
                      </div>
                    </button >
                  ))}
                </div>
              ))}
            </div>
          </div>
        )
        :
        <main className='bgIncident flex justify-center items-center mt-20 h-52'>
          <div className='w-10 h-10 border-2 border-white rounded-full animate-spin border-r-transparent' />
        </main>
      }
    </>
  )
}

export default SprintTable