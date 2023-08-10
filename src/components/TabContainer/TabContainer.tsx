import React from 'react';
import { useParams } from 'react-router-dom';
import ActiveNotesTab from './ActiveNotesTab';
import { ArchiveTab } from './ArchiveTab';

const TabContainer: React.FC = () => {
  const { tab } = useParams();
  const currentTab = tab || '';

  return (
    <div className="mb-6">
      {(tab === 'active' || currentTab.length === 0) && <ActiveNotesTab />}
      {tab === 'archive' && <ArchiveTab />}
    </div>
  );
};

export default TabContainer;
