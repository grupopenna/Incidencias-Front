import { BrowserRouter, Route, Routes } from 'react-router-dom';
import NavBar from './components/NavBar/NavBar';
import Home from './view/Home';
import NotifyIncidentForm from './components/NotifyIncidentForm/NotifyIncidentForm';
import NewRequirements from './view/IncidentTable/IncidentTable';
import IncidentTable from './view/IncidentTable/IncidentTable';
import ViewAllIndicent from './components/viewAllIndicent';
// import { useSelector } from 'react-redux';

const App = () => {

  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col bg-background">
        <NavBar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/createIssue" element={<NewRequirements />} />
          <Route exact path="/board/:key" element={<IncidentTable />} />
          <Route exact path="/createIssue/form/:key/:issueId" element={<NotifyIncidentForm />} />
          <Route exac path="/view-all-incidents" element={<ViewAllIndicent />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
