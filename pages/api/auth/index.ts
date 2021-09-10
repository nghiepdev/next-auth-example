import type {NextApiRequest, NextApiResponse} from 'next';
import {applyApiCookie} from 'next-universal-cookie';

import {accessTokenName, SessionState} from 'core/authenticated';

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<SessionState>
) {
  applyApiCookie(req, res);

  if (req.method === 'POST') {
    res.cookie(accessTokenName, 'base64_valid', {
      path: '/',
      maxAge: 999999,
      httpOnly: true,
      secure: req.headers['x-forwarded-proto'] === 'https',
    });

    res.json({
      me: {
        email: 'john_doe@gmail.com',
      },
      access_token: 'base64_valid',
    });
  } else {
    res.status(401);
    res.end();
  }
}
