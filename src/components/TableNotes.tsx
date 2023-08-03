import React, { Dispatch } from 'react';
import { AnyAction } from 'redux';
import { Note } from '../types/Note';
import { NoteItem } from './NoteItem';

interface TableNotesProps {
  notes: Note[],
  dispatch: Dispatch<AnyAction>,
}

export const TableNotes: React.FC<TableNotesProps> = ({ notes, dispatch }) => {
  return (
    <table
      className="table
      is-bordered
      is-striped
      is-narrow
      is-hoverable
      is-fullwidth"
    >
      <thead>
        <tr>
          <th>Time of Creation</th>
          <th>Note Content</th>
          <th>Note Category</th>
          <th>Dates Mentioned</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {notes.map((note) => (
          <NoteItem key={note.id} note={note} dispatch={dispatch} />
        ))}
      </tbody>
    </table>
  );
};
