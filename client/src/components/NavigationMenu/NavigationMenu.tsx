import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavigationMenu = () => {
  const location = useLocation();
  const Menus = [
    {
      name: 'Favorites',
      url: '/favorites',
      icon: <ion-icon name="heart-outline" />,
      dis: 'translate-x-[2rem]',
    },
    {
      name: 'Home',
      url: '/',
      icon: <ion-icon name="home-outline" />,
      dis: 'translate-x-[8.5rem]',
    },
    {
      name: 'SalinTempel',
      url: '/my-salintempel',
      icon: <ion-icon name="document-text-outline" />,
      dis: 'translate-x-[15rem]',
    },
  ];
  const [active, setActive] = useState('/');
  return (
    <div className="navigation">
      <ul>
        {Menus.map((menu, index) => (
          <li
            className={`list
          ${location.pathname === menu.url ? 'active' : ''}
          `}
          >
            <Link to={menu.url}>
              <span className="icon">{menu.icon}</span>
              <span className="text">{menu.name}</span>
            </Link>
          </li>
        ))}
        <div className="indicator left-[]"></div>
      </ul>
    </div>
  );
};

export default NavigationMenu;
