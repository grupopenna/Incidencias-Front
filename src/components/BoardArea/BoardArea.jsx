/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../Loader';
import { A2REAS } from '../../const';
import { getAreaPriorizado } from '../../redux/actions/issue/getAreaPriorizado';
import { DragDropContext } from "@hello-pangea/dnd";
import BoardsCard from '../BoardsCard/BoardsCard';
import { clearIssueByKey } from '../../redux/actions';
import ViewerView from '../ViewerView';

const BoardArea = () => {
  const [modalShow, setModalShow] = useState(false);
  const priorizados = useSelector(state => state.areas)
  const IssueKey = useSelector(state => state.issueByKey)

  const dispatch = useDispatch();
  const [isLoading, setIsloding] = useState(false)

  useEffect(() => {
    const fetchData = async () => {
      setIsloding(true);
      await getAreaPriorizado()(dispatch).then(()=>{
        setIsloding(false);
      }).catch((err)=> {
        console.log('err', err)
        setIsloding(false)
      })
    };

    fetchData(); // Llamada inicial al cargar el componente

  //   // Configurar la recarga cada 5 minutos
    const intervalId = setInterval(() => {
      fetchData();
    }, 5 * 60 * 1000);

  //   // Limpiar el intervalo al desmontar el componente
    return () => clearInterval(intervalId);

  }, []);

  if (isLoading) {
    return <Loader />;
  }

  const onDragEnd = () => {}

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
      {modalShow && <ModalDescription setModalShow={setModalShow} />}
      <DragDropContext onDragEnd={onDragEnd} className="flex">
        <div className={`gap-x-2 w-full mt-5 grid grid-cols-${Object.values(A2REAS)?.length}`}>
              {/* {Object.keys(A2REAS)?.map((area, i) => (<h1 key={i} className="px-3 pt-1 font-bold text-font text-center text-2xl">{area}</h1>
                ))
              } */}
        </div>
        <div className={`gap-x-2 w-full mt-5 grid grid-cols-${Object.values(A2REAS)?.length}`}>
            {Object.keys(A2REAS)?.map((area, i) => (
              <div key={i} className=" bg-bgColumn  rounded-lg w-full min-h-screen">
                <div className="flex flex-col w-full h-full">
                  <h1 className="px-3 pt-1 font-bold text-font text-center text-2xl">{area}</h1>
                  <div className="pt-1">
                    <div id="aprobado" className="px-1">
                      <h3 className="border-b text-gray-400">Top 5</h3>
                    </div>
                    <div className="pt-2">
                      {priorizados[area]?.length > 0 ?
                        priorizados[area].map((item) => {
                            return <BoardsCard
                              key={item.id}
                              item={item}
                              setModalShow={setModalShow}
                            />

                        })
                        : <div className="text-center pt-4 pb-9">
                        <h2 className="text-gray-400 font-semibold text-sm flex p-2">Aún no se ha priorizado un top incidencias</h2>
                      </div>
                      }
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </DragDropContext>
    </div>
  )
}

export default BoardArea;