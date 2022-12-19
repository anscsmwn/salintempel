import { FiHome } from 'react-icons/fi';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const NavigationMenu = () => {
  const location = useLocation();
  const Menus = [
    {
      name: 'Favorites',
      url: '/favorites',
      icon: <MdOutlineFavoriteBorder />,
      dis: 'translate-x-[2rem]',
    },
    { name: 'Home', url: '/', icon: <FiHome />, dis: 'translate-x-[8.5rem]' },
    {
      name: 'SalinTempel',
      url: '/my-salintempel',
      icon: <HiOutlineDocumentText />,
      dis: 'translate-x-[15rem]',
    },
  ];
  const [active, setActive] = useState('/');
  return (
    <nav className="bg-black max-h-[4.4rem] px-14 rounded-t-xl fixed bottom-0 mx-auto w-full max-w-md bg-opacity-70 backdrop-blur-sm">
      <div className="flex relative">
        <span
          className={`bg-white duration-500 ${
            location.pathname === active &&
            `transform ${Menus.find((menu) => menu.url === active)?.dis}`
          }
          } border-4 border-gray-900 h-16 w-16 absolute
           -top-5 rounded-full`}
        ></span>
        <ul className="flex items-center justify-center gap-10 w-full">
          {Menus.map((menu, i) => (
            <li key={i} className="w-16">
              <Link
                to={menu.url}
                className="flex flex-col text-center pt-6 items-center"
                onClick={() => setActive(menu.url)}
              >
                <span
                  className={`text-xl cursor-pointer duration-500 text-white ${
                    active === menu.url
                      ? '-mt-10 text-black z-10 scale-125'
                      : ''
                  } `}
                >
                  {menu.icon}
                </span>
                <p
                  className={` ${
                    active === menu.url
                      ? 'translate-y-4 duration-700 opacity-100'
                      : 'opacity-0 translate-y-10'
                  } text-white text-sm font-semibold`}
                >
                  {menu.name}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
};

export default NavigationMenu;
