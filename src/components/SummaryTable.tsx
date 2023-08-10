import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const SummaryTable: React.FC = () => {
  const notes = useSelector((state: RootState) => state.notes.data);
  const categories = ['Task', 'Random Thought', 'Idea'];

  const getActiveNotesCount = (category: string) => {
    return notes.filter((note) => note.category === category && !note.archived).length;
  };

  const getArchivedNotesCount = (category: string) => {
    return notes.filter((note) => note.category === category && note.archived).length;
  };

  return (
    <table className="table w-full">
      <thead>
        <tr>
          <th className="px-4 py-2">Category</th>
          <th className="px-4 py-2">Active Notes Count</th>
          <th className="px-4 py-2">Archived Notes Count</th>
        </tr>
      </thead>
      <tbody>
        {categories.map((category) => (
          <tr key={category} className="bg-gray-100">
            <td className="px-4 py-2">{category}</td>
            <td className="px-4 py-2">{getActiveNotesCount(category)}</td>
            <td className="px-4 py-2">{getArchivedNotesCount(category)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SummaryTable;
