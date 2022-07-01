import {GetServerSidePropsContext} from 'next';
import {applyServerSideCookie} from 'next-universal-cookie';
import ky from 'ky-universal';

import {SessionState} from './types';
import {ACCESS_TOKEN_NAME} from 'core/authenticated';

export async function getSession(ctx: GetServerSidePropsContext) {
  applyServerSideCookie(ctx.req, ctx.res);
  const accessToken = ctx.req.cookies[ACCESS_TOKEN_NAME];

  if (accessToken) {
    try {
      const data = await ky
        .get(`http://${ctx.req.headers.host}/api/auth/session`, {
          headers: {
            Authorization: accessToken,
          },
        })
        .json<SessionState>();

      return data;
    } catch (error) {
      ctx.res.clearCookie(ACCESS_TOKEN_NAME);
    }
  }

  return null;
}
