import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, deleteNote, toggleArchive } from '../store/store';

const NoteList: React.FC = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state: RootState) => state.notes.data);

  return (
    <table className="table is-fullwidth">
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
          <tr key={note.id}>
            <td>{note.createdAt.toLocaleString()}</td>
            <td>{note.content}</td>
            <td>{note.category}</td>
            <td>{note.datesMentioned.join(', ')}</td>
            <td>
              <button
                className={`button ${
                  note.archived ? 'is-warning' : 'is-success'
                }`}
                onClick={() => dispatch(toggleArchive(note.id))}
              >
                {note.archived ? 'Unarchive' : 'Archive'}
              </button>
              <button
                className="button is-danger"
                onClick={() => dispatch(deleteNote(note.id))}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default NoteList;
