import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import { lazy } from 'react';
import { Suspense } from 'react';
import SprintTable from './components/ProxSprintTable/SprintTable';
// import { useSelector } from 'react-redux';

const HomeLazy = lazy(() => import('./view/Home'))
const NotifyIncidentFormLazy = lazy(() => import('./components/NotifyIncidentForm/NotifyIncidentForm'))
const NewRequirementsLazy = lazy(() => import('./view/IncidentTable/IncidentTable'))
const IncidentTableLazy = lazy(() => import('./view/IncidentTable/IncidentTable'))
const ViewAllIndicentLazy = lazy(() => import('./components/viewAllIndicent'))


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
            <Route exact path="/proxSprint/:key" element={<SprintTable />} />
          </Routes>
        </div>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
