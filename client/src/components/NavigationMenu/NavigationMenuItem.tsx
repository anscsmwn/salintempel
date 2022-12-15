import React from 'react';
import { Link } from 'react-router-dom';

interface NavigationMenuItemProps {
  url: string;
  text: string;
  icon?: React.ReactNode;
  isActive: boolean;
}

const NavigationMenuItem = ({
  url,
  text,
  icon,
  isActive,
}: NavigationMenuItemProps) => {
  return (
    <Link
      className={`${
        isActive ? 'font-semibold' : 'text-sm'
      } group flex items-center flex-col justify-center gap-1`}
      to={url}
    >
      <span className="scale-125 transition-all group-hover:scale-150">
        {icon}
      </span>
      <p>{text}</p>
    </Link>
  );
};

export default NavigationMenuItem;
