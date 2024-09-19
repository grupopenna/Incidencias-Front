/* eslint-disable react/prop-types */
import { useState } from 'react';
import { getIssue, getTransitions } from '../../redux/actions'
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"
import { Callout, Card } from '@tremor/react';
import { LogOut } from '../Icon';


const PROJECT_DESCRIPTION = {
  CHS: 'Proyecto relacionado a la aplicación de Choferes, notificar posibles mejoras, errores encontrados, etc. ',
  CMS: 'Proyecto relacionado con todo el area de compras, notificar posibles mejoras, errores encontrados, etc.',
  NR: 'Nueva implementación la cual no existe un tablero en donde poder colocarla',
  ERP: 'Tareas relacionadas con el area de Softland',
  SIT: 'Cualquier problema relacionado a infraestructura (Leandro)',
  DEBO: 'Tareas o errores relacionas con DEBO'
}

const SelectedIncident = ({ projects }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [select, setSelect] = useState('')
  const { area } = useSelector((state) => state.user)

  const handleRedirect = async (key) => {
    setLoading(true)
    setSelect(key)
    setTimeout(() => { setLoading(false) }, 2500);

    await getIssue(key, area)(dispatch).then((response) => {
      if (response) {
        if (response.length > 0) {
          searchTransition(response[0].key);
        } else if (response.length < 0) {
          console.log("No hay incidencias");
        }
      }
      return console.log('response SelectedIncident getIssue', response);
    }).catch((error) => { throw error });

    navigate(`/board/${key}`)

  }

  const handleLogOut = async () => {
      localStorage.removeItem('token')
      localStorage.removeItem('urlToken')
      localStorage.removeItem('userData')
      navigate('/')
  }

  const searchTransition = async (key) => {
    await getTransitions(key)(dispatch).then((response) => {
      console.log('response SelectedIncident getTransitions', response);
    }).catch((error) => console.log('error', error));
  }

  return (
    <main className="flex flex-col justify-center items-center w-full">
      <div className='absolute left-10 bottom-10 cursor-pointer' onClick={handleLogOut}>
        <LogOut /> 
        <span className='text-red-500'>Cerrar sesión</span>
      </div>
      <article className="flex flex-col items-center mt-4 w-full md:w-4/5 lg:w-8/12 xl:w-1/2 p-6">
          <h2 className="text-2xl font-bold text-navy-700 text-white">
            Seleccione módulo
          </h2>
        <section className="h-full mt-5  grid grid-cols-3 gap-5">
          {
            projects.map((project) =>
              <Card 
                key={project.key} 
                decoration='bottom'
                decorationColor='indigo'
                className="bg-slate-200 rounded-xl">
                  <div className='w-full h-full flex flex-col items-center'>
                    <h4 className='text-xl text-slate-800'>{project.name}</h4>
                    <Callout
                    className='mt-4  flex-1' 
                      title='Descripción '
                    >
                      {PROJECT_DESCRIPTION[project?.key]}
                    </Callout>


                    <button 
                    onClick={() => handleRedirect(project.key)} 
                    className='bg-indigo-700 text-white px-6 py-2 rounded-md mt-2 hover:bg-indigo-700/80'>
                      { loading && select === project?.key
                        ? <div className='w-6 h-6 border-2 border-white rounded-full animate-spin border-r-transparent' />
                        :  'Ver'
                      }
                    </button>
                  </div>
                  
              </Card>)
          }
        </section>
      </article>
    </main>
  )
}

export default SelectedIncident