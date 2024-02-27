/* eslint-disable react-hooks/exhaustive-deps */
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { lazy } from 'react';
import { Suspense } from 'react';
import {NotFound} from './view/NotFound/NotFound'

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
const BoardAreaLazy = lazy(() => import('./components/BoardArea/BoardArea'))
const SprintTableLazy = lazy(() => import('./components/ProxSprintTable/SprintTable'))
const ProtectedRoute = lazy(() => import('./components/ProtectedRoute'))
const SearchIssue = lazy(() => import('./components/SearchIssue'))
const DailyReport = lazy(() => import('./components/DailyReport'))
const WithoutState = lazy(() => import('./components/WithoutState'))
const LoginFormLazy = lazy(() => import('./components/LoginForm/LoginForm'))
const SendEmail = lazy(() => import('./components/SendEmail/SendEmail'))
const SendEmailSucces = lazy(() => import('./components/SendEmailSucces/SendEmailSucces'))

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
            <Route path='/login' element={ <LoginFormLazy /> } />
            <Route path='/send-email' element={ <SendEmail /> } />
            <Route path='/send-email/success' element={ <SendEmailSucces /> } />
            <Route element={<ProtectedRoute />}>
              <Route exact path="/" element={<HomeLazy />} />
              <Route exact path="/createIssue" element={<NewRequirementsLazy />} />
              <Route exact path="/board/:key" element={<IncidentTableLazy />} />
              <Route exact path="/createIssue/form/:key/" element={<NotifyIncidentFormLazy />} />
              <Route exact path="/view-all-incidents/:jiraAccountId" element={<ViewAllIndicentLazy />} />
              <Route exact path="/proxSprint/:key" element={<SprintTableLazy />} />
              <Route exact path="/control-general" element={<BoardDirectorioLazy />} />
              <Route exact path="/control-areas" element={<BoardAreaLazy />} />
              <Route exact path='/search-issue/' element={<SearchIssue />} />
              <Route exact path='/search-issue/:key' element={<SearchIssue />} />
              <Route exact path='/daily-report' element={<DailyReport />} />
              <Route exact path='/sin-comenzar' element={<WithoutState />} />
            </Route>
            <Route path='*' redirectTo='/notFound' element={<NotFound />} />
            <Route path='notFound' element={<NotFound />} />
          </Routes>
        </div>
      </Suspense>
    </BrowserRouter>
  );
}

export default App;
