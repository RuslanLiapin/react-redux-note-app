import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TabContainer from './components/TabContainer/TabContainer';
import AddNoteForm from './components/AddNoteForm';
import SummaryTable from './components/SummaryTable';
import { TabNavItem } from './components/TabNavItem';

const App: React.FC = () => {
  return (
    <div className="max-w-screen-lg mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4">Note App</h1>
      <AddNoteForm />
      <Router>
        <div>
          <nav className="tabs is-centered">
            <ul>
              <TabNavItem to="/active" text="Active notes" />
              <TabNavItem to="/archive" text="Archive notes" />
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
