import { FiHome } from 'react-icons/fi';
import { MdOutlineFavoriteBorder } from 'react-icons/md';
import { HiOutlineDocumentText } from 'react-icons/hi';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const NavigationMenu = () => {
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
  const [active, setActive] = useState(1);
  return (
    <nav className="bg-black max-h-[4.4rem] px-14 rounded-t-xl fixed bottom-0 mx-auto w-full max-w-md bg-opacity-70 backdrop-blur-sm">
      <div className="flex relative">
        <span
          className={`bg-white duration-500 ${Menus[active].dis} border-4 border-gray-900 h-16 w-16 absolute
           -top-5 rounded-full`}
        ></span>
        <ul className="flex items-center justify-center gap-10 w-full">
          {Menus.map((menu, i) => (
            <li key={i} className="w-16">
              <Link
                to={menu.url}
                className="flex flex-col text-center pt-6 items-center"
                onClick={() => setActive(i)}
              >
                <span
                  className={`text-xl cursor-pointer duration-500 text-white ${
                    i === active ? '-mt-10 text-black z-10 scale-125' : ''
                  } `}
                >
                  {menu.icon}
                </span>
                <p
                  className={` ${
                    active === i
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
