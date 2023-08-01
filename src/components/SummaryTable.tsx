import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const SummaryTable: React.FC = () => {
  const notes = useSelector((state: RootState) => state.notes.data);
  const categories = ['Task', 'Random Thought', 'Idea'];

  const getActiveNotesCount = (category: string) => {
    return notes
      .filter(note => note.category === category && !note.archived).length;
  };

  const getArchivedNotesCount = (category: string) => {
    return notes
      .filter(note => note.category === category && note.archived).length;
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Category</th>
          <th>Active Notes Count</th>
          <th>Archived Notes Count</th>
        </tr>
      </thead>
      <tbody>
        {categories.map(category => (
          <tr key={category}>
            <td>{category}</td>
            <td>{getActiveNotesCount(category)}</td>
            <td>{getArchivedNotesCount(category)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SummaryTable;
