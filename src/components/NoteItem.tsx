/* eslint-disable react/button-has-type */
import React, { Dispatch, useState } from 'react';
import { AnyAction } from 'redux';
import { Note } from '../types/Note';
import { deleteNote, toggleArchive } from '../store/store';
import EditNoteForm from './EditNoteForm';

type NoteProps = {
  note: Note,
  dispatch: Dispatch<AnyAction>,
};

export const NoteItem: React.FC<NoteProps> = ({ note, dispatch }) => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleEditClose = () => {
    setIsEditing(false);
  };

  if (isEditing) {
    return (
      <tr>
        <td colSpan={5}>
          <EditNoteForm note={note} onClose={handleEditClose} />
        </td>
      </tr>
    );
  }

  return (
    <tr>
      <td>{note.createdAt.toLocaleString()}</td>
      <td>{note.content}</td>
      <td>{note.category}</td>
      <td>{note.datesMentioned.join(', ')}</td>
      <td>
        <div className="buttons">
          <button
            className={`button ${note.archived ? 'is-warning' : 'is-success'}`}
            onClick={() => dispatch(toggleArchive(note.id))}
          >
            {note.archived ? 'Unarchive' : 'Archive'}
          </button>
          <button
            className="button is-primary"
            onClick={handleEdit}
          >
            Edit
          </button>
          <button
            className="button is-danger"
            onClick={() => dispatch(deleteNote(note.id))}
          >
            Delete
          </button>
        </div>
      </td>
    </tr>
  );
};
