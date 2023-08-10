import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../store/store';

const SummaryTable: React.FC = () => {
  const notes = useSelector((state: RootState) => state.notes.data);
  const categories = ['Task', 'Random Thought', 'Idea'];

  const getActiveNotesCount = (category: string) => {
    return notes
      .filter((note) => note.category === category && !note.archived).length;
  };

  const getArchivedNotesCount = (category: string) => {
    return notes
      .filter((note) => note.category === category && note.archived).length;
  };

  return (
    <div className="w-full overflow-x-auto shadow-md">
      <table className="min-w-full
      bg-white rounded-lg overflow-hidden"
      >
        <thead className="bg-blue-500 text-white">
          <tr>
            <th className="py-3 px-4 text-left">Category</th>
            <th className="py-3 px-4 text-left">Active Notes</th>
            <th className="py-3 px-4 text-left">Archived Notes</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category} className="bg-gray-100">
              <td className="py-2 px-4">{category}</td>
              <td className="py-2 px-4">{getActiveNotesCount(category)}</td>
              <td className="py-2 px-4">{getArchivedNotesCount(category)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SummaryTable;
