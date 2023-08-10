import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNote } from '../store/store';
import { Note } from '../types/Note';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

const AddNoteForm: React.FC = () => {
  const dispatch = useDispatch();
  const [noteContent, setNoteContent] = useState<string>('');
  const [noteCategory, setNoteCategory] = useState<string>('Task');
  const [emptyContentError, setEmptyContentError] = useState(false);

  const extractDatesFromContent = (content: string) => {
    // eslint-disable-next-line max-len
    const dateRegex = /\b\d{1,2}\/\d{1,2}\/\d{4}\b|\b\d{4}-\d{2}-\d{2}\b|\b\d{2}\.\d{2}\.\d{4}\b/g;

    return content.match(dateRegex) || [];
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (noteContent.trim() === '') {
      setEmptyContentError(true);
      return;
    }

    const datesMentioned = extractDatesFromContent(noteContent);

    const newNote: Note = {
      id: new Date().getTime(),
      createdAt: new Date(),
      content: noteContent,
      category: noteCategory,
      datesMentioned,
      archived: false,
    };

    dispatch(addNote(newNote));
    setNoteContent('');
    setNoteCategory('Task');
    setEmptyContentError(false);
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 relative bg-white rounded shadow-md">
      <div className="mb-7">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="content">
          Note:
        </label>
        <textarea
          id="content"
          className={`w-full h-20 px-3 py-2 border rounded focus:outline-none ${
            emptyContentError ? 'border-red-500' : 'border-gray-300'
          }`}
          value={noteContent}
          onChange={(e) => {
            setNoteContent(e.target.value);
            setEmptyContentError(false);
          }}
          onKeyDown={handleKeyDown}
          placeholder='Write your note here...'
        />
        {emptyContentError && (
          <p className="
            absolute left-6 text-red-500 text-xs mt-1
            transform
          ">
            Content cannot be empty
          </p>
        )}
      </div>
      <div className="mb-4 max-w-md">
        <label className="block text-gray-700 font-bold mb-2" htmlFor="category">
          Category:
        </label>
        <div className="relative">
          <select
            id="category"
            value={noteCategory}
            onChange={(e) => setNoteCategory(e.target.value)}
            className="w-full appearance-none px-3 py-2 border rounded focus:outline-none"
          >
            <option value="Task">Task</option>
            <option value="Random Thought">Random Thought</option>
            <option value="Idea">Idea</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
            <FontAwesomeIcon icon={faChevronDown} className="text-gray-400" />
          </div>
        </div>
      </div>
      <div className="flex items-center justify-end">
        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none">
          Add Note
        </button>
      </div>
    </form>
  );
};

export default AddNoteForm;
