import React from 'react';
import NoteList from './components/NoteList';
import AddNoteForm from './components/AddNoteForm';
import SummaryTable from './components/SummaryTable';
import 'bulma/css/bulma.min.css';

const App: React.FC = () => {
  return (
    <div>
      <h1>Notes App</h1>
      <AddNoteForm />
      <NoteList />
      <SummaryTable />
    </div>
  );
};

export default App;
