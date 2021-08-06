import {useEffect, useRef} from 'react';
import ky from 'ky-universal';

import {Me} from 'lib/auth/types';
import {useAuthContext} from 'lib/auth/Context';

let state: 'idle' | 'fetching' | 'done' | 'error' = 'idle';
export const useSession = () => {
  const [session, setSession] = useAuthContext();
  const loggedIn = !!session;
  const isFetchAuth = useRef(loggedIn);

  useEffect(() => {
    const fetchAuthSession = async () => {
      try {
        const data = await ky.get('/api/auth/session').json<Me>();

        setSession(data);
        state = 'done';
      } catch {
        setSession(undefined);
        state = 'error';
      } finally {
        isFetchAuth.current = true;
      }
    };

    if (
      isFetchAuth.current === false &&
      (state === 'idle' || state === 'error')
    ) {
      state = 'fetching';
      fetchAuthSession();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return session;
};
