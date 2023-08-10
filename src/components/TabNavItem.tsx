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
  const isActive = to.slice(1) === currentTab || (currentTab.length === 0 && text === 'Active notes');

  const liClassName = classNames({ 'is-active': isActive });

  return (
    <li className={liClassName}>
      <Link to={to} className="block py-2 px-4">{text}</Link>
    </li>
  );
};
