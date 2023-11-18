'use client';

import { ReactNode, createContext, useState } from 'react';
import { User } from '../query/user.query';

export const CurrentUserContext = createContext<User | null>(null)

export function CurrentUserProvider({ user = null, children }:{ user: User | null, children: ReactNode }) {

  const [currentUser] = useState<User>(user)

  return (
    <CurrentUserContext.Provider value={ currentUser }>
      {children}
    </CurrentUserContext.Provider>
  );
}