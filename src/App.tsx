import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TabContainer from './components/TabContainer/TabContainer';
import 'bulma/css/bulma.min.css';
import AddNoteForm from './components/AddNoteForm';
import SummaryTable from './components/SummaryTable';
import { TabNavItem } from './components/TabNavItem';

const App: React.FC = () => {
  return (
    <div className="container is-max-desktop">
      <AddNoteForm />
      <Router>
        <div>
          <nav className="tabs is-centered">
            <ul>
              <TabNavItem to="/active" text='Active notes' />
              <TabNavItem to="/archive" text='Archive notes' />
            </ul>
          </nav>
          <Routes>
            <Route path="/" element={<TabContainer />} />
            <Route path="/:tab" element={<TabContainer />} />
          </Routes>
        </div>
      </Router>
      <SummaryTable />
    </div>
  );
};

export default App;
