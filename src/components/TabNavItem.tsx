import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import classNames from 'classnames';

interface TabLinkProps {
  to: string;
  text: 'Active notes' | 'Archive notes';
}

export const TabNavItem: React.FC<TabLinkProps> = ({ to, text }) => {
  const location = useLocation();
  const currentTab = location.pathname.replace('/', '');
  const isActive = to.slice(1) === currentTab
    || (currentTab.length === 0 && text === 'Active notes');

  const liClassName = classNames('tab-nav-item', {
    'font-semibold bg-green-200 shadow-md': isActive,
  });

  return (
    <li className={liClassName}>
      <Link
        to={to}
        className="block transition duration-300
          ease-in-out transform
          hover:font-semibold hover:shadow-md p-4 rounded-md"
      >
        {text}
      </Link>
    </li>
  );
};
