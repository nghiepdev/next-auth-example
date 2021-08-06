import {createContext, useContext} from 'react';

import {Me} from './types';

const AuthContext = createContext<
  | [Me | undefined, React.Dispatch<React.SetStateAction<Me | undefined>>]
  | undefined
>(undefined);

export const AuthProvider = AuthContext.Provider;

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context == null) {
    throw new Error(`Missing <AuthProvider />.`);
  }

  return context;
};
