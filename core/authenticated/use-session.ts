import {useEffect} from 'react';
import {useRouter} from 'next/router';
import ky, {HTTPError} from 'ky-universal';

import {SessionState} from './types';
import {useAuthContext} from './AuthContext';

let globalFetching = false;

export const useSession = () => {
  const router = useRouter();
  const [session, setAuthContext] = useAuthContext();
  const loggedIn = !!session;

  useEffect(() => {
    const fetchAuthSession = async () => {
      try {
        globalFetching = true;
        const data = await ky.get('/api/auth/session').json<SessionState>();

        if (data) {
          setAuthContext(data);
        }
      } catch (error) {
        if (error instanceof HTTPError) {
          const status = error.response.status;

          if (status === 401) {
            router.replace(`/signin?next=${encodeURIComponent(router.asPath)}`);
          }
        }
      } finally {
        globalFetching = false;
      }
    };

    if (globalFetching === false && loggedIn === false) {
      fetchAuthSession();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return session;
};
