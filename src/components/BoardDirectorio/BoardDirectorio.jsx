/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getApprove, getTopFive, getUsers } from '../../redux/actions/';
import { Badge, Select, SelectItem } from '@tremor/react'
import Loader from '../Loader';
import { AREAS } from '../../const';
import { clearIssueByKey, getIssueByKey } from './../../redux/actions/issue/getIssueByKey';
import ViewerView from './../ViewerView/index';


const colorStatusIssue = {
  'Validar': 'red',
  'En Proceso': 'orange',
  'Priorizado': 'yellow',
  'Validado': 'blue'
}

const BoardDirectorio = () => {

  const [selectedArea, setSelectedArea] = useState(AREAS.SISTEMAS)
  const top = useSelector(state => state.top)
  const approve = useSelector(state => state.approve)
  const responsables = useSelector(state => state.users)
  const IssueKey = useSelector(state => state.issueByKey)

  const dispatch = useDispatch();
  const [isLoading, setIsloding] = useState(true)
  const [modalShow, setModalShow] = useState(false)

  useEffect(() => {
    (async () => {
      await getUsers(selectedArea)(dispatch)
    })()
  }, [selectedArea])

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

  const ModalDescription = () => {
    return (
      <div className='z-10 fixed left-[-10px] right-[-10px] bottom-[-10px] top-[-10px] bg-bgModal flex justify-center items-center'>
        <div className='h-1/2 w-1/2 rounded-lg p-3 bg-slate-100 overflow-auto relative'>
          <span onClick={() => { setModalShow(false); dispatch(clearIssueByKey()) }} className='bg-red-500 z-50 text-white flex justify-center cursor-pointer items-center absolute top-1 right-1 h-5 w-5 rounded-full'>X</span>
          {
            IssueKey.length > 0
              ? IssueKey[0].fields.description ? <ViewerView description={IssueKey[0].fields.description} /> : "NO HAY DESCRIPCIÓN"
              : <div className='h-full'>
                <main className='w-full h-full rounded-mdpx-3 py-2 text-sm font-semibold text-white shadow-sm flex justify-center items-center'>
                  <div className='w-8 h-8 border-2 border-black rounded-full animate-spin border-r-transparent' />
                </main>
              </div>
          }
        </div>
      </div>
    )
  }

  return (
    <div className="w-full flex flex-col h-full justify-center pt-1 p-5">
      <div className='w-8 h-8 flex gap-x-4 items-center'>
        <Select value={selectedArea} onValueChange={setSelectedArea}>
          {Object.keys(AREAS).map((key, index) => (
            <SelectItem key={index} value={AREAS[key]}>
              {AREAS[key]?.replace(AREAS[key][0], AREAS[key][0].toUpperCase())}
            </SelectItem>
          ))}
        </Select>
        <button
          onClick={handleChangeArea}
          className='bg-indigo-600 px-4 py-2  rounded-md text-white font-semibold hover:bg-indigo-600/80'>Cambiar</button>
      </div>
      {modalShow && <ModalDescription setModalShow={setModalShow} />}
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
                      return <div key={item.id} className="w-full h-fit flex ">
                        <div key={item.key} className="w-full p-1 my-1 mx-1 rounded-md bg-bgIncident flex flex-col text-gray-200" >
                          <p className="text-gray-400 font-bold text-sm flex">{item.fields.summary}</p>
                          <p className="text-gray-400 text-sm">{item.fields.timetracking?.timeSpent}</p>
                          <div className="flex justify-between">
                            <div className="flex items-center gap-1">
                              <img src={item.fields.issuetype?.iconUrl} alt="Imagen del icono del proyecto de jira" className="w-4 h-4" />
                              <a target="_blank" rel="noreferrer" href={`https://gpenna.atlassian.net/browse/${item.key}`} className="text-gray-400 text-sm flex">{item.key}</a>
                            </div>
                            {item.fields.status === 'Priorizado' ? '' :
                              <Badge
                                color={colorStatusIssue[item.fields.status] ?? 'gray'}
                                className=" p-1 rounded-md my-4  text-sm flex">
                                {item.fields.status}
                              </Badge>
                            }
                          </div>

                          <div onClick={() => { setModalShow(true); dispatch(getIssueByKey(item.key)) }} className='text-blue-400 cursor-pointer'>Mas Info...</div>

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
                              <a target="_blank" rel="noreferrer" href={`https://gpenna.atlassian.net/browse/${item.key}`} className="text-gray-400 text-sm flex">{item.key}</a>
                            </div>
                            <p className="text-gray-400 text-sm flex">{item.fields.status.name}</p>
                          </div>

                          <div className='text-blue-400 cursor-pointer' onClick={() => { setModalShow(true); dispatch(getIssueByKey(item.key)) }}>Mas Info...</div>

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
