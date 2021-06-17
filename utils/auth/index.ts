import {useState, useEffect} from 'react';
import {GetServerSidePropsContext} from 'next';
import {applyServerSidePropsCookie} from 'next-universal-cookie';
import ky from 'ky-universal';

import Provider from './Provider';
import {useAuth} from './context';
import {Me} from 'utils/auth/types';

export const accessTokenName = 'auth_session';

export async function getSession(ctx: GetServerSidePropsContext) {
  applyServerSidePropsCookie(ctx.req, ctx.res);
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

export const useSession = () => {
  const [session, setSession] = useAuth();
  const [me, setMe] = useState<Me | undefined>(session);

  const shouldBeFetch = !me;

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

        setMe(data);
        setSession(data);
      } catch {
        setMe(undefined);
        setSession(undefined);
      }
    };

    if (shouldBeFetch) {
      fetchAuthSession();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldBeFetch]);

  return me;
};

export {Provider as AuthProvider};
