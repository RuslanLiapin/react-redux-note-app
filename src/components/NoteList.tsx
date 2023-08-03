import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { RootState } from '../store/store';
import { Note } from '../types/Note';
import { TableNotes } from './TableNotes';

const selectNotesData = (state: RootState) => state.notes.data;

const selectFilteredNotes = (notes: Note[], tab: string) => {
  return tab === 'active' || tab.length === 0
    ? notes.filter((note: Note) => !note.archived)
    : notes.filter((note: Note) => note.archived);
};

export const NoteList: React.FC = () => {
  const dispatch = useDispatch();
  const { tab } = useParams<{ tab: string }>();
  const currentTab = tab || '';
  const notesData = useSelector(selectNotesData);
  const filteredNotes = selectFilteredNotes(notesData, currentTab);

  let notificationMessage = '';

  if (currentTab === 'active' && filteredNotes.length === 0) {
    notificationMessage = 'No active notes available.';
  } else if (currentTab === 'archive' && filteredNotes.length === 0) {
    notificationMessage = 'No archived notes available.';
  }

  return (
    <div>
      {notificationMessage ? (
        <div className="notification is-danger">{notificationMessage}</div>
      ) : (
        <TableNotes notes={filteredNotes} dispatch={dispatch} />
      )}
    </div>
  );
};
