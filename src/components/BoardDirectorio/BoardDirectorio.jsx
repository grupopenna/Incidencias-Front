/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
// import Modal from '../Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { getTopFive } from '../../redux/actions/issue/getTopFive';
import { getApprove } from '../../redux/actions/issue/getApprove';
import Loader from '../Loader';

const BoardDirectorio = () => {
  // const [modalShow, setModalShow] = useState(false);
  // const [itemSelect, setItemSelect] = useState({});
  const top = useSelector(state => state.top)
  const approve = useSelector(state => state.approve)
  const responsables = ["Carolina", "David", "Luciano", "Matias", "Julian", "Leandro", "Sebastian", "Alcides"];

  const dispatch = useDispatch();
  const [isLoading, setIsloding] = useState(true)

  useEffect(() => {
    const fetchData = async () => {
      await getTopFive()(dispatch);
      await getApprove()(dispatch);
      setIsloding(false);
    };

    fetchData(); // Llamada inicial al cargar el componente

    // Configurar la recarga cada 5 minutos
    const intervalId = setInterval(() => {
      fetchData();
    }, 5 * 60 * 1000);

    // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(intervalId);
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div className="w-full flex justify-center pt-1 pb-5">
      {/* {modalShow && <Modal setModalShow={setModalShow} itemSelect={itemSelect} />} */}
        <div className={`gap-x-2 w-full grid grid-cols-${responsables.length} mx-3`}>
            {responsables?.map((transition, i) => (
              <div key={i} className=" bg-bgColumn  rounded-lg w-full min-h-screen">
                <div className="flex flex-col w-full h-full">
                  <h1 className="px-3 pt-1 font-bold text-font text-2xl">{transition}</h1>
                  <div className="pt-1">
                  <div id="aprobado" className="px-1">
                    <h3 className="border-b text-gray-400">Top 5</h3>
                  </div>
                  <div className="pt-2">
                    {top[transition]?.length > 0 ?
                      top[transition].map((item) => {
                          return <div key={item.id}  className="w-full h-fit flex ">
                            <div key={item.key} className="w-full p-1 my-1 mx-1 rounded-md bg-bgIncident flex flex-col text-gray-200" >
                                  <p className="text-gray-400 font-bold text-sm flex">{item.fields.summary}</p>
                                  <p className="text-gray-400 text-sm">{item.fields.timetracking?.timeSpent}</p>
                                  <div className="flex justify-between">
                                    <div className="flex items-center gap-1">
                                      <img src={item.fields.issuetype?.iconUrl} alt="Imagen del icono del proyecto de jira" className="w-4 h-4" />
                                      <p className="text-gray-400 text-sm flex">{item.key}</p>
                                    </div>
                                    <p className="text-gray-400 text-sm flex">{item.fields.status.name}</p>
                                  </div>
                            </div>
                          </div>

                      })
                      : <div className="text-center pt-4 pb-9">
                      <h2 className="text-gray-400 font-semibold text-sm flex p-2">Aún no se ha priorizado un top incidencias</h2>
                    </div>
                    }
                  </div>
                  </div>
                  <div id="aprobado" className="px-1 pt-4">
                    <h3 className="border-b text-gray-400">Proximos</h3>
                    <div className="pt-2">
                      {approve[transition].length > 0 ?
                      approve[transition].map((item) => {
                          return <div key={item.id} className="w-full h-fit flex ">
                            <div key={item.key} className="w-full p-1 my-1 mx-1 rounded-md bg-bgIncident flex flex-col text-gray-200" >
                                  <p className="text-gray-400 font-bold text-sm flex">{item.fields.summary}</p>
                                  <p className="text-gray-400 text-sm">{item.fields.timetracking?.timeSpent}</p>
                                  <div className="flex justify-between">
                                    <div className="flex items-center gap-1">
                                      <img src={item.fields.issuetype?.iconUrl} alt="Imagen del icono del proyecto de jira" className="w-4 h-4" />
                                      <p className="text-gray-400 text-sm flex">{item.key}</p>
                                    </div>
                                    <p className="text-gray-400 text-sm flex">{item.fields.status.name}</p>
                                  </div>
                            </div>
                          </div>

                      })
                      : <div className="text-center pt-4 pb-9">
                        <h2 className="text-gray-400 font-semibold text-sm flex p-2">No hay siguientes incidencias a realizar</h2>
                      </div>
                      }
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
    </div>
  )
}

export default BoardDirectorio;