/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom"
import { getTransitions } from "../../redux/actions/transitions/getTransitions";
import { useDispatch } from "react-redux";
import { getIssue } from "../../redux/actions/issue/getIssue";
import { getBoard } from "../../redux/actions/board/getBoard";

const SelectedIncident = ({ projects }) =>{
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const handleRedirect = async (key) => {
    await getBoard(key)(dispatch).then((response) =>{ 
      return console.log('response SelectedIncident getBoard', response);
    }).catch((error) => {throw error});

    await getIssue(key)(dispatch).then((response) =>{ 
      if (response){
        searchTransition(response[0].key);
      }
      return console.log('response SelectedIncident getIssue', response);
    }).catch((error) => {throw error});

    navigate(`board/${key}`)
    
  }

  const searchTransition =  async (key) => {
    await getTransitions(key)(dispatch).then((response) => {
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
            { project.name }
          </button>)
        }
        <button onClick={() => handleRedirect("create-new")} className="rounded-xl bg-gradient-to-br from-indigo-700 via-indigo-600 to-indigo-500 px-5 py-3 text-base font-medium text-white transition duration-200 hover:shadow-lg hover:shadow-[#6025F5]/50">
          Crear nuevo desarrollo
        </button>
        </div>
      </div>
  </div>
  )
}

export default SelectedIncident