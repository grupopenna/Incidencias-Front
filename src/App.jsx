import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import { Suspense } from 'react';
// import { useSelector } from 'react-redux';


/**
 * 
 * Siempre que se agregue un nuevo componente/view, importarlo de forma lazy, como se ve abajo,
 * sino, si se importa el componente de formar normal eso genera que se rompan los estilos del editor. 
 */

const NavBar = lazy(() => import('./components/NavBar/NavBar'))
const HomeLazy = lazy(() => import('./view/Home'))
const NotifyIncidentFormLazy = lazy(() => import('./components/NotifyIncidentForm/NotifyIncidentForm'))
const NewRequirementsLazy = lazy(() => import('./view/IncidentTable/IncidentTable'))
const IncidentTableLazy = lazy(() => import('./view/IncidentTable/IncidentTable'))
const ViewAllIndicentLazy = lazy(() => import('./components/viewAllIndicent'))
const SprintTableLazy = lazy(() => import('./components/ProxSprintTable/SprintTable'))


const App = () => {

  return (
    <BrowserRouter>
      <Suspense fallback={null}>
        <div className="flex min-h-screen flex-col bg-background">
          <NavBar />
          <Routes>
            <Route exact path="/" element={<HomeLazy />} />
            <Route exact path="/createIssue" element={<NewRequirementsLazy />} />
            <Route exact path="/board/:key" element={<IncidentTableLazy />} />
            <Route exact path="/createIssue/form/:key/" element={<NotifyIncidentFormLazy />} />
            <Route exac path="/view-all-incidents/:jiraAccountId" element={<ViewAllIndicentLazy />} />
            <Route exact path="/proxSprint/:key" element={<SprintTableLazy />} />
          </Routes>
        </div>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
