/* eslint-disable react/prop-types */
import { useState } from 'react';
import { getIssue, getTransitions } from '../../redux/actions'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"

const SelectedIncident = ({ projects }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)
  const [select, setSelect] = useState('')

  const handleRedirect = async (key) => {
    setLoading(true)
    setSelect(key)
    setTimeout(() => { setLoading(false) }, 2500);

    await getIssue(key)(dispatch).then((response) => {
      if (response) {
        if (response.length > 0) {
          searchTransition(response[0].key);
        } else if (response.length < 1) {
          //alert("No hay incidencias");
          navigate(`board/${key}`)
        }
      }
      return console.log('response SelectedIncident getIssue', response);
    }).catch((error) => { throw error });
  }

  const searchTransition = async (key) => {
    await getTransitions(key)(dispatch).then((response) => {
      navigate(`board/${key.split('-')[0]}`)
      console.log('response SelectedIncident getTransitions', response);
    }).catch((error) => console.log('error', error));
  }

  return (
    <div className="flex flex-col justify-center items-center h-[100vh]">
      <div className="!z-5 relative flex flex-col rounded-[20px] max-w-[300px] bg-white bg-clip-border shadow-3xl shadow-shadow-500  w-full !p-6 3xl:p-![18px] undefined">
        <div className="w-full relative flex flex-row justify-center">
          <h4 className="text-xl font-bold text-navy-700 dark:text-white">
            Seleccione módulo
          </h4>
        </div>
        <div className="h-full w-full mt-5 flex flex-col gap-5">
          {
            projects.map((project) =>
              <button onClick={() => handleRedirect(project.key)} key={project.key} className="rounded-xl bg-gradient-to-br from-indigo-700 via-indigo-600 to-indigo-500 px-5 py-3 text-base font-medium text-white transition duration-200 hover:shadow-lg hover:shadow-[#6025F5]/50">
                {loading & select === project.key ? (
                  <main className='bg-gradient-to-br from-indigo-700 via-indigo-600 to-indigo-500 flex justify-center items-center'>
                    <div className='w-6 h-6 border-2 border-white rounded-full animate-spin border-r-transparent' />
                  </main>
                )
                  :
                  project.name
                }
              </button>)

          }
          <button onClick={() => navigate("/view-all-incidents/12")} className="rounded-xl bg-gradient-to-br from-indigo-700 via-indigo-600 to-indigo-500 px-5 py-3 text-base font-medium text-white transition duration-200 hover:shadow-lg hover:shadow-[#6025F5]/50">
            Ver todas las incidencias
          </button>
          {/* <button onClick={() => handleRedirect("create-new")} className="rounded-xl bg-gradient-to-br from-indigo-700 via-indigo-600 to-indigo-500 px-5 py-3 text-base font-medium text-white transition duration-200 hover:shadow-lg hover:shadow-[#6025F5]/50">
          Crear nuevo desarrollo
        </button> */}
        </div>
      </div>
    </div>
  )
}

export default SelectedIncident