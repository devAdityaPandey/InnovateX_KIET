import { Icon } from '@iconify/react';

import { SideNavItem } from './types';

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'Home',
    path: '/',
    icon: <Icon icon="lucide:home" width="24" height="24" />,
  },
  {
    title: 'Profile',
    path: '/profile',
    icon: <Icon icon="lucide:user" width="24" height="24" />,
  },
  {
    title: 'Messages',
    path: '/messages',
    icon: <Icon icon="lucide:mail" width="24" height="24" />,
  },
  {
    title: 'Notification',
    path: '/notification',
    icon: <Icon icon="lucide:bell" width="24" height="24" />
  },
  {
    title: 'Settings',
    path: '/settings',
    icon: <Icon icon="lucide:settings" width="24" height="24" />,
    submenu: true,
    subMenuItems: [
      { title: 'Account', path: '/settings/account' },
      { title: 'Privacy', path: '/settings/privacy' },
    ],
  },
  {
    title: 'About',
    path: '/about',
    icon: <Icon icon="lucide:info" width="24" height="24" />
  },
  {
    title: 'Logout',
    path: '/',
    icon: <Icon icon="lucide:log-out" width="24" height="24" /> 
  }
];

// {
//   title: 'Home',
//   path: '/',
//   icon: <Icon icon="lucide:home" width="24" height="24" />,
// },
// {
//   title: 'Profile',
//   path: '/projects',
//   icon: <Icon icon="lucide:folder" width="24" height="24" />,
//   // submenu: true,
//   // subMenuItems: [
//   //   { title: 'All', path: '/projects' },
//   //   { title: 'Web Design', path: '/projects/web-design' },
//   //   { title: 'Graphic Design', path: '/projects/graphic-design' },
//   // ],
// },
// {
//   title: 'Messages',
//   path: '/messages',
//   icon: <Icon icon="lucide:mail" width="24" height="24" />,
// },
// {
//   title: 'Notification',
//   path: '/messages',
//   icon: <Icon icon="lucide:mail" width="24" height="24" />,
// },
// {
//   title: 'Settings',
//   path: '/settings',
//   icon: <Icon icon="lucide:settings" width="24" height="24" />,
//   submenu: true,
//   subMenuItems: [
//     { title: 'Account', path: '/settings/account' },
//     { title: 'Privacy', path: '/settings/privacy' },
//   ],
// },
// {
//   title: 'Help',
//   path: '/help',
//   icon: <Icon icon="lucide:help-circle" width="24" height="24" />,
// },
// {
//   title: 'Help',
//   path: '/help',
//   icon: <Icon icon="lucide:help-circle" width="24" height="24" />,
// },