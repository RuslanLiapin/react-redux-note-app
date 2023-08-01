/* eslint-disable jsx-a11y/label-has-associated-control */

import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNote } from '../store/store';
import { Note } from '../types/Note';

const AddNoteForm: React.FC = () => {
  const dispatch = useDispatch();
  const [noteContent, setNoteContent] = useState('');
  const [noteCategory, setNoteCategory] = useState('Task');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (noteContent.trim() !== '') {
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
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Note:</label>
        <textarea
          value={noteContent}
          onChange={(e) => setNoteContent(e.target.value)}
        />
      </div>
      <div>
        <label>Category:</label>
        <select
          value={noteCategory}
          onChange={(e) => setNoteCategory(e.target.value)}
        >
          <option value="Task">Task</option>
          <option value="Random Thought">Random Thought</option>
          <option value="Idea">Idea</option>
        </select>
      </div>
      <button type="submit">Add Note</button>
    </form>
  );
};

export default AddNoteForm;
