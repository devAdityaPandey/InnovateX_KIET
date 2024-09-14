import { Icon } from '@iconify/react';

import { SideNavItem } from './types';

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'Home',
    path: '/',
    icon: <Icon icon="lucide:home" width="24" height="24" />,
    isBottom: false,
  },
  {
    title: 'Profile',
    path: '/profile',
    icon: <Icon icon="lucide:user" width="24" height="24" />,
    isBottom: false,
  },
  {
    title: 'Messages',
    path: '/messages',
    icon: <Icon icon="lucide:mail" width="24" height="24" />,
    isBottom: false,
  },
  {
    title: 'Notification',
    path: '/notification',
    icon: <Icon icon="lucide:bell" width="24" height="24" />,
    isBottom: false,
  },  
  {
    title: 'Settings',
    path: '/settings',
    icon: <Icon icon="lucide:settings" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: 'Account', path: '/settings/account', isBottom: true},
      { title: 'Privacy', path: '/settings/privacy' ,isBottom: true},
    ],
    isBottom: true,
  },
  {
    title: 'About',
    path: '/about',
    icon: <Icon icon="lucide:info" width="24" height="24" />,
    isBottom: true,
  },
  // {
  //   title: 'Help',
  //   path: '/help',
  //   icon: <Icon icon="lucide:help-circle" width="24" height="24" />,
  //   isBottom: true,
  // },
  {
    title: 'Logout',
    path: '/',
    icon: <Icon icon="lucide:log-out" width="24" height="24" />,
    isBottom: true,
  }
];
