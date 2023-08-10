import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editNote } from '../store/store';
import { Note } from '../types/Note';
import { extractDatesFromContent } from '../utils/utils';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

interface EditNoteFormProps {
  note: Note;
  onClose: () => void;
}

const EditNoteForm: React.FC<EditNoteFormProps> = ({ note, onClose }) => {
  const dispatch = useDispatch();
  const [content, setContent] = useState(note.content);
  const [category, setCategory] = useState(note.category);
  const [emptyContentError, setEmptyContentError] = useState(false);
  const [isListOpen, setIsListOpen] = useState(false);

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
    <form
      onSubmit={handleSubmit}
      className="relative flex pr-4 gap-4 items-center"
    >
      <div className="flex-grow">
        <input
          id="content"
          type="text"
          className={`
            w-full px-3 py-2 border rounded focus:outline-none
            ${emptyContentError ? 'border-red-500' : 'border-gray-300'}
          `}
          value={content}
          onChange={e => {
            setContent(e.target.value);
            setEmptyContentError(false);
          }}
        />
        {emptyContentError && (
          <p className="
            absolute left-4 text-red-500 text-xs mt-1
            transform
          ">
            Content cannot be empty
          </p>
        )}
      </div>
      <div>
        <div className="relative">
          <select
            id="category"
            value={category}
            onChange={e => setCategory(e.target.value)}
            className="appearance-none px-3 py-2 border rounded focus:outline-none focus:ring focus:border-blue-300"
            onClick={() => setIsListOpen(!isListOpen)}
            onBlur={() => setIsListOpen(false)}
          >
            <option value="Task">Task</option>
            <option value="Random Thought">Random Thought</option>
            <option value="Idea">Idea</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <FontAwesomeIcon
              icon={faChevronDown}
              className="text-gray-400"
            />
          </div>
        </div>
      </div>
      <div>
        <button
          type="submit"
          className="
            bg-blue-500 hover:bg-blue-600 text-white font-bold
            py-2 px-4 rounded focus:outline-none"
        >
          Save
        </button>
        <button
          type="button"
          className="
            ml-2 text-gray-500 hover:text-gray-700 font-bold
            py-2 px-4 rounded focus:outline-none"
          onClick={onClose}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

export default EditNoteForm;
