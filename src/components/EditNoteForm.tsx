import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editNote } from '../store/store';
import { Note } from '../types/Note';
import { extractDatesFromContent } from '../utils/utils';

interface EditNoteFormProps {
  note: Note;
  onClose: () => void;
}

const EditNoteForm: React.FC<EditNoteFormProps> = ({ note, onClose }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState(note.content);
  const [category, setCategory] = useState(note.category);
  const [emptyContentError, setEmptyContentError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (content.trim() === '') {
      setEmptyContentError(true);

      return;
    }

    const datesMentioned = extractDatesFromContent(content);

    dispatch(editNote(note.id, content, category, datesMentioned));
    onClose();
  };

  return (
    <form onSubmit={handleSubmit} className="columns is-grouped">
      <div className="column is-half">
        <div className="field">
          <div className="control">
            <input
              type="text"
              className={`input ${emptyContentError ? 'is-danger' : ''}`}
              value={content}
              onChange={e => {
                setContent(e.target.value);
                setEmptyContentError(false);
              }}
            />
            {emptyContentError && (
              <p className="help is-danger">Content cannot be empty</p>
            )}
          </div>
        </div>
      </div>
      <div className="column">
        <div className="field">
          <div className="control is-expanded has-icons-left">
            <div className="select">
              <select
                value={category}
                onChange={e => setCategory(e.target.value)}
              >
                <option value="Task">Task</option>
                <option value="Random Thought">Random Thought</option>
                <option value="Idea">Idea</option>
              </select>
            </div>
            <div className="icon is-center">
              <i className="fas fa-list" />
            </div>
          </div>
        </div>
      </div>
      <div className="column">
        <div className="field is-grouped">
          <div className="control">
            <button type="submit" className="button is-primary">Save</button>
          </div>
          <div className="control">
            <button
              type="button"
              className="button"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

export default EditNoteForm;
