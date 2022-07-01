import type {NextApiRequest, NextApiResponse} from 'next';
import {applyApiCookie} from 'next-universal-cookie';
import {HTTPError} from 'ky-universal';

import {ACCESS_TOKEN_NAME, SessionState} from 'core/authenticated';

const FAKE_VALID_TOKEN = 'fake_base64_valid';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<SessionState | {status: number; message: string}>
) {
  applyApiCookie(req, res);

  const accessToken =
    req.headers['authorization'] || req.cookies[ACCESS_TOKEN_NAME];

  if (req.method === 'GET' && accessToken) {
    try {
      // TODO: fetch user from database
      // const user = await fetch('/api/user');
      res.json({
        me: {
          email: 'john_doe@gmail.com',
        },
        access_token: FAKE_VALID_TOKEN,
      });
    } catch (error) {
      let status = 401;
      let message =
        error instanceof Error ? error.message : 'Authenticated failed';

      if (error instanceof HTTPError) {
        status = error.response.status;
        message = error.message;
      }

      res.clearCookie(ACCESS_TOKEN_NAME);
      res.status(status).json({status, message});
    }
  } else {
    res.status(204);
  }

  res.end();
}
