import {createContext, useContext} from 'react';

import {SessionState} from './types';

const AuthContext = createContext<
  | [
      SessionState | undefined,
      React.Dispatch<React.SetStateAction<SessionState | undefined>>
    ]
  | null
>(null);

export const AuthProvider = AuthContext.Provider;

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context == null) {
    throw new Error(`Missing <AuthProvider />.`);
  }

  return context;
};
