import type {NextApiRequest, NextApiResponse} from 'next';

import {applyApiCookie} from 'next-universal-cookie';
import {accessTokenName} from 'utils/auth';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  applyApiCookie(req, res);

  res.cookie(accessTokenName, 'base64_valid', {
    path: '/',
    maxAge: 999999,
    httpOnly: true,
    // secure: true,
  });

  res.json({
    email: 'john_doe@gmail.com',
  });
}
