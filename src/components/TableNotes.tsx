import React, { Dispatch } from 'react';
import { AnyAction } from 'redux';
import { Note } from '../types/Note';
import { NoteItem } from './NoteItem';

interface TableNotesProps {
  notes: Note[];
  dispatch: Dispatch<AnyAction>;
}

export const TableNotes: React.FC<TableNotesProps> = ({ notes, dispatch }) => {
  return (
    <table className="border-collapse border w-full">
      <thead>
        <tr className="bg-gray-200">
          <th className="py-2 text-center">Time of Creation</th>
          <th className="py-2">Note Content</th>
          <th className="py-2">Note Category</th>
          <th className="py-2">Dates Mentioned</th>
          <th className="py-2 text-center">Actions</th>
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

export default TableNotes;
