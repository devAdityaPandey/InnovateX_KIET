import { Icon } from '@iconify/react';
import { useRouter } from 'next/router'; 
import { SideNavItem } from './types';

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: 'Feeds',
    path: '/feeds',
    icon: <Icon icon="lucide:home" width="24" height="24" />,

    isBottom: false,

  },
  {
    title: 'Profile',
    path: '/users/profile',
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
  //   title: 'Logout',
  //   path: '/users/login',
  //   icon: <Icon icon="lucide:log-out" width="24" height="24" />,
  //   isBottom: true,
  // }

   {
    title: 'Logout',
    // Set path as null or remove it since we will handle the logout separately
    path: "/",
    icon: <Icon icon="lucide:log-out" width="24" height="24" />,
    isBottom: true,
    // onClick: async () => {
    //   // Your logout logic here
    //   const response = await fetch('/api/users/logout', {
    //     method: 'GET',
    //   });

    //   if (response.ok) {
    //     // Clear the token from cookies
    //     document.cookie = 'token=; Max-Age=0; path=/';
    //     alert('Logged out successfully');
    //     // Redirect to login
    //     window.location.href = '/users/login'; // Use window.location.href to navigate
    //   } else {
    //     const errorData = await response.json();
    //     alert(`Error: ${errorData.message}`);
    //   }
    // },
  },
];

