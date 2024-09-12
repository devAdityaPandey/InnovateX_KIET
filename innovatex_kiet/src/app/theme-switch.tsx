'use client'; // Ensure this is client-side

import React, { useState, useEffect } from 'react';
import { Switch } from '@nextui-org/react';
import { useTheme } from 'next-themes';
import { MoonIcon } from './MoonIcon'; // Assuming you have this icon component
import { SunIcon } from './SunIcon'; // Assuming you have this icon component

export default function App() {
  // Use the next-themes hook to manage the theme
  const { setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Ensure component is mounted before rendering theme-related components
  useEffect(() => setMounted(true), []);

  // Prevent rendering until mounted to avoid hydration mismatch
  if (!mounted) return null;

  // Determine if dark mode is currently enabled
  const isDarkMode = resolvedTheme === 'dark';

  return (
     <div className="flex items-center space-x-2">
      <Switch
        size="lg"
        color="secondary"
        checked={isDarkMode} // Check based on the current theme
        onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')} // Toggle between light and dark themes
        thumbIcon={({ isSelected, className }) =>
          isSelected ? (
            <SunIcon className={`w-6 h-6 ${className} `} /> // Larger Sun icon for dark mode
          ) : (
            <MoonIcon className={`w-6 h-6 ${className} `} /> // Larger Moon icon for light mode
          )
        }
      >
        {/* Dark mode */}
      </Switch>
      <span className="font-bold text-lg dark:text-white ">{isDarkMode ? 'Dark Mode' : 'Light Mode'}</span> {/* Label */}
    </div>
  );
}
//    <Switch
//       size="lg"
//       color="secondary"
//       checked={isDarkMode} // Check based on the current theme
//       onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')} // Toggle between light and dark themes
//       thumbIcon={({ isSelected, className }) =>
//         isSelected ? (
//           <SunIcon className={className} /> // Icon for dark mode
//         ) : (
//           <MoonIcon className={className} /> // Icon for light mode
//         )
//       }
//     >
//       {/* Dark mode */}
//     </Switch>
