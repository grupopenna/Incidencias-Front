/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import { Suspense } from 'react';

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
const ViewAllIndicentLazy = lazy(() => import('./components/ViewAllIndicent/index'))
const BoardDirectorioLazy = lazy(() => import('./components/BoardDirectorio/BoardDirectorio'))
const SprintTableLazy = lazy(() => import('./components/ProxSprintTable/SprintTable'))
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'))

const Loader = () => {
  return <section className='w-full min-h-screen flex bg-background justify-center items-center'>
    <div className='w-6 h-6 rounded-full border-2 border-white border-l-transparent animate-spin'/>
  </section>
}

const App = () => {

  return (
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <div className="flex min-h-screen flex-col bg-background">
          <NavBar />
          <Routes>
            <Route element={<ProtectedRoute />}>
              <Route exact path="/" element={<HomeLazy />} />
              <Route exact path="/createIssue" element={<NewRequirementsLazy />} />
              <Route exact path="/board/:key" element={<IncidentTableLazy />} />
              <Route exact path="/createIssue/form/:key/" element={<NotifyIncidentFormLazy />} />
              <Route exac path="/view-all-incidents/:jiraAccountId" element={<ViewAllIndicentLazy />} />
              <Route exact path="/proxSprint/:key" element={<SprintTableLazy />} />
              <Route exact path="/general-sistemas" element={<BoardDirectorioLazy />} />
            </Route>
          </Routes>
        </div>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
