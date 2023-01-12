import { Link, useLocation } from 'react-router-dom';
import { FiHome } from 'react-icons/fi';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { HiOutlineDocumentText } from 'react-icons/hi';

const NavigationMenu = () => {
  const location = useLocation();
  const Menus = [
    {
      name: 'Favorites',
      url: '/favorites',
      icon: <MdOutlineFavoriteBorder />,
    },
    {
      name: 'Home',
      url: '/',
      icon: <FiHome />,
    },
    {
      name: 'SalinTempel',
      url: '/my-salintempel',
      icon: <HiOutlineDocumentText />,
    },
  ];
  console.log();
  return (
    <div className="navigation">
      <ul>
        {Menus.map((menu, index) => (
          <li
            key={index}
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
        {location.pathname !== '/create' &&
          location.pathname !== '/login' &&
          location.pathname !== '/register' &&
          !location.pathname.includes('/edit') && (
            <div className="indicator"></div>
          )}
      </ul>
    </div>
  );
};

export default NavigationMenu;
