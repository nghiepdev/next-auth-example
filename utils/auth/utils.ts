import {useEffect, useRef} from 'react';
import {GetServerSidePropsContext} from 'next';
import {applyServerSideCookie} from 'next-universal-cookie';
import ky from 'ky-universal';

import {useAuth} from './context';
import {Me} from 'utils/auth/types';

export const accessTokenName = 'auth_session';

export async function getSession(ctx: GetServerSidePropsContext) {
  applyServerSideCookie(ctx.req, ctx.res);
  const accessToken = ctx.req.cookies[accessTokenName];

  if (accessToken) {
    try {
      const data = await ky
        .get(`http://${ctx.req.headers.host}/api/auth/session`, {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .json<Me>();

      return data;
    } catch (error) {
      ctx.res.clearCookie(accessTokenName);
    }
  }

  return null;
}

let state: 'idle' | 'fetching' | 'done' | 'error' = 'idle';
export const useSession = () => {
  const [session, setSession] = useAuth();
  const loggedIn = !!session;
  const isFetchAuth = useRef(loggedIn);

  useEffect(() => {
    const fetchAuthSession = async () => {
      try {
        const data = await ky
          .get('/api/auth/session', {
            headers: {
              'Content-Type': 'application/json',
            },
          })
          .json<Me>();

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
