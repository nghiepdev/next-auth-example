import {GetServerSidePropsContext} from 'next';
import {applyServerSideCookie} from 'next-universal-cookie';
import ky from 'ky-universal';

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
            Authorization: accessToken,
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
