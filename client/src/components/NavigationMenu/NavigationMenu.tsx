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
      dis: 'translate-x-[2rem]',
    },
    {
      name: 'Home',
      url: '/',
      icon: <FiHome />,
      dis: 'translate-x-[8.5rem]',
    },
    {
      name: 'SalinTempel',
      url: '/my-salintempel',
      icon: <HiOutlineDocumentText />,
      dis: 'translate-x-[15rem]',
    },
  ];
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
        <div className="indicator left-[]"></div>
      </ul>
    </div>
  );
};

export default NavigationMenu;
