import PrivateRoute from '@/components/privateRoute';
import React from 'react';

const Notification = () => {
  return (
    <PrivateRoute>
      <span className="font-bold text-4xl dark:text-white">Notification</span>

      <div className="border-dashed border border-zinc-500 dark:border-zinc-600 w-full h-12 rounded-lg"></div>
      <div className="border-dashed border border-zinc-500 dark:border-zinc-600 w-full h-64 rounded-lg"></div>
    </PrivateRoute>
  );
};

export default Notification;
