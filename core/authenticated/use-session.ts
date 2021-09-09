import {useEffect} from 'react';
import {useRouter} from 'next/router';
import ky from 'ky-universal';

import {SessionState} from './types';
import {useAuthContext} from './AuthenticatedContext';

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
      } catch (error: any) {
        const statusCode = error.response?.status;
        if (statusCode === 401 || statusCode === 403) {
          router.replace(`/signin?next=${encodeURIComponent(router.asPath)}`);
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
