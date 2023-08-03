import React from 'react';
import { useParams } from 'react-router-dom';
import ActiveNotesTab from './ActiveNotesTab';
import { ArchiveTab } from './ArchiveTab';

const TabContainer: React.FC = () => {
  const { tab } = useParams();

  return (
    <div>
      {(tab === 'active' || tab?.length === 0) && <ActiveNotesTab />}
      {tab === 'archive' && <ArchiveTab />}
    </div>
  );
};

export default TabContainer;
