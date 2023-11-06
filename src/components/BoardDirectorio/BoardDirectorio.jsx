/* eslint-disable react-hooks/exhaustive-deps */
import Modal from "../Modal/Modal"
import { useEffect } from "react";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getTopFive } from "../../redux/actions/issue/getTopFive";
import { getApprove } from "../../redux/actions/issue/getApprove";

const BoardDirectorio = () => {
  const [modalShow, setModalShow] = useState(false);
  const [itemSelect, setItemSelect] = useState({});
  const top = useSelector(state => state.top)
  const approve = useSelector(state => state.approve)
  const responsables = ["Carolina", "David", "Luciano", "Matias", "Julian", "Leandro", "Sebastian"];

  const dispatch = useDispatch();
  
  useEffect(()=> {
    getTopFive()(dispatch)
    getApprove()(dispatch)
  }, [])

  return (
    <div className="w-full flex justify-center py-5">
      {modalShow && <Modal setModalShow={setModalShow} itemSelect={itemSelect} />}
        <div className={`gap-x-2 w-full grid grid-cols-${responsables.length} mx-3`}>
            {responsables.map((transition, i) => (
              <div key={i} className=" bg-bgColumn  rounded-lg w-full min-h-screen">
                <div className="flex flex-col w-full h-full">
                  <h1 className="px-3 pt-1 font-bold text-font text-2xl">{transition}</h1>
                  <div className="pt-1">
                  <div id="aprobado" className="px-1">
                    <h3 className="border-b text-gray-400">Top 5</h3>
                  </div>
                  {
                    top[transition].map((item) => {
                        return <button key={item.id} onClick={() => { setModalShow(true), setItemSelect(item) }} className="w-full h-fit flex ">
                          <div key={item.key} className="w-full p-1 my-2 mx-1 rounded-md bg-bgIncident flex flex-col text-gray-200" >
                                <p className="text-gray-400 font-bold text-sm flex">{item.fields.summary}</p>
                                <p className="text-gray-400 text-sm">{item.fields.timetracking?.timeSpent}</p>
                                <div className="flex justify-between">
                                  <p className="text-gray-400 text-sm flex">{item.key}</p>
                                  <p className="text-gray-400 text-sm flex">{item.fields.status.name}</p>
                                </div>
                          </div>
                        </button>

                    })
                  }
                    {/* <div  className="h-fit p-1 my-2 mx-1 rounded-md bg-bgIncident flex flex-col text-gray-200" >
                          <p className="text-gray-400 font-bold text-sm flex">trabajando duro</p>
                          <p className="text-gray-400 text-sm">4d 3h 30m 10s</p>
                          <div className="flex justify-between">
                            <p className="text-gray-400 text-sm flex">ERP-5</p>
                            <p className="text-gray-400 text-sm flex">En Proceso</p>
                          </div>
                    </div> */}
                  </div>
                  <div id="aprobado" className="px-1 pt-2">
                    <h3 className="border-b text-gray-400">Proximos</h3>
                    {
                    approve[transition].map((item) => {
                        return <button key={item.id} onClick={() => { setModalShow(true), setItemSelect(item) }} className="w-full h-fit flex ">
                          <div key={item.key} className="w-full p-1 my-2 mx-1 rounded-md bg-bgIncident flex flex-col text-gray-200" >
                                <p className="text-gray-400 font-bold text-sm flex">{item.fields.summary}</p>
                                <p className="text-gray-400 text-sm">{item.fields.timetracking?.timeSpent}</p>
                                <div className="flex justify-between">
                                  <p className="text-gray-400 text-sm flex">{item.key}</p>
                                  <p className="text-gray-400 text-sm flex">{item.fields.status.name}</p>
                                </div>
                          </div>
                        </button>

                    })
                  }
                  </div>

                </div>
                  {/* <button  onClick={() => { setModalShow(true), setItemSelect(item) }} className="w-full flex ">
                    <Incident
                      item={item}
                    />
                  </button> */}
                
              </div>
            ))}
        </div>
    </div>
  )
}

export default BoardDirectorio;