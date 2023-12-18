/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
// import Modal from '../Modal/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { getApprove, getTopFive, getUsers } from '../../redux/actions/';
import { Select, SelectItem } from '@tremor/react'
import Loader from '../Loader';
import { AREAS } from '../../const';

const BoardDirectorio = () => {
  // const [modalShow, setModalShow] = useState(false);
  // const [itemSelect, setItemSelect] = useState({});
  const [selectedArea, setSelectedArea] = useState(AREAS.SISTEMAS)
  const top = useSelector(state => state.top)
  const approve = useSelector(state => state.approve)
  const responsables = useSelector(state => state.users)

  const dispatch = useDispatch();
  const [isLoading, setIsloding] = useState(true)
  console.log('top', top)

  useEffect(() => {
    (async () => {
      await getUsers(selectedArea)(dispatch)
    })()
  } ,[selectedArea])

  useEffect(() => {
    const fetchData = async () => {
      await getTopFive(selectedArea)(dispatch);
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

  }, []);

  if (isLoading) {
    return <Loader />;
  }

  const handleChangeArea = async () => {
      setIsloding(true)
      await getTopFive(selectedArea)(dispatch)
      await getApprove(selectedArea)(dispatch)
      setIsloding(false)
  }

  const processNames = (value) => {
      return value?.split(' ')[0]
  }

  return (
    <div className="w-full flex flex-col h-full justify-center pt-1 p-5">
      <div className='w-8 h-8 flex gap-x-4 items-center'>
        <Select  value={selectedArea} onValueChange={setSelectedArea}>
          {Object.keys(AREAS).map((key, index) => (
            <SelectItem  key={index} value={AREAS[key]}>
              {AREAS[key]?.replace(AREAS[key][0], AREAS[key][0].toUpperCase())}
            </SelectItem>
          ))}
        </Select>
        <button 
          onClick={handleChangeArea}
          className='bg-indigo-600 px-4 py-2  rounded-md text-white font-semibold hover:bg-indigo-600/80'>Cambiar</button>
      </div>
      {/* {modalShow && <Modal setModalShow={setModalShow} itemSelect={itemSelect} />} */}
        <div className={`gap-x-2 w-full mt-5 grid grid-cols-${responsables?.length}`}>
            {responsables?.map((transition, i) => (
              <div key={i} className=" bg-bgColumn  rounded-lg w-full min-h-screen">
                <div className="flex flex-col w-full h-full">
                  <h1 className="px-3 pt-1 font-bold text-font text-2xl">{processNames(transition?.displayName)}</h1>
                  <div className="pt-1">
                    <div id="aprobado" className="px-1">
                      <h3 className="border-b text-gray-400">Top 5</h3>
                    </div>
                    <div className="pt-2">
                      {top[processNames(transition?.displayName)]?.length > 0 ?
                        top[processNames(transition?.displayName)].map((item) => {
                            return <div key={item.id}  className="w-full h-fit flex ">
                              <div key={item.key} className="w-full p-1 my-1 mx-1 rounded-md bg-bgIncident flex flex-col text-gray-200" >
                                    <p className="text-gray-400 font-bold text-sm flex">{item.fields.summary}</p>
                                    <p className="text-gray-400 text-sm">{item.fields.timetracking?.timeSpent}</p>
                                    <div className="flex justify-between">
                                      <div className="flex items-center gap-1">
                                        <img src={item.fields.issuetype?.iconUrl} alt="Imagen del icono del proyecto de jira" className="w-4 h-4" />
                                        <a target="_blank" rel="noreferrer" href={`https://gpenna.atlassian.net/browse/${item.key}`} className="text-gray-400 text-sm flex">{item.key}</a>
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
                    <h3 className="border-b text-gray-400">Próximos</h3>
                    <div className="pt-2">
                      {approve[processNames(transition?.displayName)]?.length > 0 ?
                      approve[processNames(transition?.displayName)].map((item) => {
                          return <div key={item.id} className="w-full h-fit flex ">
                            <div key={item.key} className="w-full p-1 my-1 mx-1 rounded-md bg-bgIncident flex flex-col text-gray-200" >
                                  <p className="text-gray-400 font-bold text-sm flex">{item.fields.summary}</p>
                                  <p className="text-gray-400 text-sm">{item.fields.timetracking?.timeSpent}</p>
                                  <div className="flex justify-between">
                                    <div className="flex items-center gap-1">
                                      <img src={item.fields.issuetype?.iconUrl} alt="Imagen del icono del proyecto de jira" className="w-4 h-4" />
                                      <a target="_blank" rel="noreferrer" href={`https://gpenna.atlassian.net/browse/${item.key}`}  className="text-gray-400 text-sm flex">{item.key}</a>
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