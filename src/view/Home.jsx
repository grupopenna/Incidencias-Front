import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SelectedIncident from '../components/SelectedIncident/index'
import { getProjects } from "../redux/actions/projects/getProjects";
// import NotifyIncidentForm from "../components/NotifyIncidentForm/NotifyIncidentForm"

const Home = () => {
  const dispatch = useDispatch();
  const projects = useSelector((state) => state.projects);

  useEffect(() => {
    issueList()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const issueList = async () => {
    await getProjects()(dispatch).then((response) =>{ 
      if (response) console.log('response Home getProjects')
    }).catch((error) => {throw error})

  }

  return (
  <div className="flex flex-col">
      <SelectedIncident projects={projects} />
      {/* <NotifyIncidentForm /> */}
  </div>
  )
}

export default Home;