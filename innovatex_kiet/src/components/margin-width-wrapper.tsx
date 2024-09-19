import { ReactNode } from 'react';

export default function MarginWidthWrapper({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex flex-col md:ml-60  md:mr-60 sm:border-r sm:border-zinc-700 min-h-screen dark:border-zinc-700">
      {children}
    </div>
  );
}
