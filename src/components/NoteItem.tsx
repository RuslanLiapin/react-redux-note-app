import React, { Dispatch, useState } from 'react';
import { AnyAction } from 'redux';
import { Note } from '../types/Note';
import { deleteNote, toggleArchive } from '../store/store';
import EditNoteForm from './EditNoteForm';

type NoteProps = {
  note: Note;
  dispatch: Dispatch<AnyAction>;
};

export const NoteItem: React.FC<NoteProps> = ({ note, dispatch }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleEditClose = () => {
    setIsEditing(false);
  };

  return (
    <>
      {isEditing ? (
        <tr className="bg-white hover:bg-gray-100">
          <td colSpan={5} className="py-2">
            <EditNoteForm note={note} onClose={handleEditClose} />
          </td>
        </tr>
      ) : (
        <tr className="bg-white hover:bg-gray-100">
          <td className="px-6 py-4">{note.createdAt.toLocaleString()}</td>
          <td className="px-6 py-4">{note.content}</td>
          <td className="px-6 py-4">{note.category}</td>
          <td className="px-6 py-4">{note.datesMentioned.join(', ')}</td>
          <td className="px-6 py-4">
            <div className="space-x-2 flex">
              <button
                className={`px-2 py-1 rounded ${
                  note.archived ? 'bg-yellow-400 hover:bg-yellow-500 text-white' : 'bg-green-400 text-white hover:bg-green-500'
                }`}
                onClick={() => dispatch(toggleArchive(note.id))}
              >
                {note.archived ? 'Unarchive' : 'Archive'}
              </button>
              <button
                className="px-2
                py-1
                rounded
                bg-blue-400
                hover:bg-blue-500
                text-white"
                onClick={handleEdit}
              >
                Edit
              </button>
              <button
                className="px-2
                py-1
                rounded
                bg-red-400
                hover:bg-red-500
                text-white"
                onClick={() => dispatch(deleteNote(note.id))}
              >
                Delete
              </button>
            </div>
          </td>
        </tr>
      )}
    </>
  );
};

export default NoteItem;
