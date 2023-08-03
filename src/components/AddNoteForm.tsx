import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNote } from '../store/store';
import { Note } from '../types/Note';

const AddNoteForm: React.FC = () => {
  const dispatch = useDispatch();
  const [noteContent, setNoteContent] = useState<string>('');
  const [noteCategory, setNoteCategory] = useState<string>('Task');
  const [emptyContentError, setEmptyContentError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (noteContent.trim() === '') {
      setEmptyContentError(true);
      return;
    }

    const newNote: Note = {
      id: new Date().getTime(),
      createdAt: new Date(),
      content: noteContent,
      category: noteCategory,
      datesMentioned: [],
      archived: false,
    };

    dispatch(addNote(newNote));
    setNoteContent('');
    setNoteCategory('Task');
    setEmptyContentError(false);
  };

  return (
    <form onSubmit={handleSubmit} className="section">
      <div className="field">
        <label className="label">Note:</label>
        <div className="control">
          <textarea
            className={`textarea ${emptyContentError ? 'is-danger' : ''}`}
            value={noteContent}
            onChange={(e) => {
              setNoteContent(e.target.value);
              setEmptyContentError(false);
            }}
          />
          {emptyContentError && (
            <p className="help is-danger">Content cannot be empty</p>
          )}
        </div>
      </div>
      <div className="field">
        <label className="label">Category:</label>
        <div className="control">
          <div className="select">
            <select
              value={noteCategory}
              onChange={(e) => setNoteCategory(e.target.value)}
            >
              <option value="Task">Task</option>
              <option value="Random Thought">Random Thought</option>
              <option value="Idea">Idea</option>
            </select>
          </div>
        </div>
      </div>
      <div className="control">
        <button type="submit" className="button is-primary">Add Note</button>
      </div>
    </form>
  );
};

export default AddNoteForm;
