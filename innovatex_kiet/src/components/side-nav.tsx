'use client';

import React, { useState } from 'react';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { SIDENAV_ITEMS } from '@/constants';
import { SideNavItem } from '@/types';
import { Icon } from '@iconify/react';




// Splitting items between top and bottom
const TOP_SIDENAV_ITEMS = SIDENAV_ITEMS.filter((item) => !item.isBottom);
const BOTTOM_SIDENAV_ITEMS = SIDENAV_ITEMS.filter((item) => item.isBottom);

const SideNav = () => {
  return (
    <div className="md:w-60 bg-white dark:bg-gray-900 dark:border-gray-700 h-screen flex-1 fixed border-r border-zinc-200 hidden md:flex">
      <div className="flex flex-col space-y-6 w-full h-full justify-between pb-4">
        {/* Render top items */}
        <div className="flex flex-col space-y-2 md:px-6">

        <Link
          href="/"
          className="flex flex-row space-x-3 items-center justify-center md:justify-start md:px-6 border-b border-zinc-200 dark:border-gray-700 h-12 w-full"
        >
          <span className="h-7 w-7 bg-zinc-300 dark:bg-gray-600 rounded-lg" />
          <span className="font-bold text-xl hidden md:flex text-gray-900 dark:text-gray-100">LOGO</span>
        </Link>


        <div className="flex flex-col space-y-2">
          {TOP_SIDENAV_ITEMS.map((item, idx) => (
            <MenuItem key={idx} item={item} />
          ))}
        </div>
        </div>

        {/* Render bottom items */}
        <div className="flex flex-col space-y-2 px-6">
          {BOTTOM_SIDENAV_ITEMS.map((item, idx) => (
            <MenuItem key={idx} item={item} />
          ))}

        </div>
      </div>
    </div>
  );
};

export default SideNav;

const MenuItem = ({ item }: { item: SideNavItem }) => {
  const pathname = usePathname();
  const [subMenuOpen, setSubMenuOpen] = useState(false);
  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  return (


    <div className="text-gray-900 dark:text-gray-100">

      {item.submenu ? (
        <>
          <button
            onClick={toggleSubMenu}

            className={`flex flex-row items-center p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-gray-800 w-full justify-between ${pathname.includes(item.path) ? 'bg-zinc-100 dark:bg-gray-800' : ''
              }`}
          >
            <div className="flex flex-row space-x-4 items-center text-gray-900 dark:text-gray-100">

              {item.icon}
              <span className="font-semibold text-xl flex text-gray-900 dark:text-gray-100">
                {item.title}
              </span>
            </div>

            <div className={`${subMenuOpen ? 'rotate-180' : ''} flex`}>
              <Icon icon="lucide:chevron-down" width="24" height="24" />
            </div>
          </button>

          {subMenuOpen && (
            <div className="my-2 ml-12 flex flex-col space-y-4">
              {item.subMenuItems?.map((subItem, idx) => {
                return (
                  <Link
                    key={idx}
                    href={subItem.path}

                    className={`${subItem.path === pathname ? 'font-bold' : ''
                      } text-gray-900 dark:text-gray-400`}

                  >
                    <span>{subItem.title}</span>
                  </Link>
                );
              })}
            </div>
          )}
        </>
      ) : (
        <Link
          href={item.path}


          className={`flex flex-row space-x-4 items-center p-2 rounded-lg hover:bg-zinc-100 dark:hover:bg-gray-800 ${item.path === pathname ? 'bg-zinc-100 dark:bg-gray-800' : ''
            }`}

        >
          {item.icon}
          <span className="font-semibold text-xl flex text-gray-900 dark:text-gray-100">
            {item.title}
          </span>
        </Link>
      )}
    </div>
  );
};

