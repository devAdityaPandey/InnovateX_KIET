// context/ReduxProvider.tsx
'use client'; // Enable client-side features like Redux

import { Provider } from 'react-redux';
import { store } from '@/lib/redux/store';
import { ReactNode } from 'react';

export default function ReduxProvider({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
