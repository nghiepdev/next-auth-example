import type {NextApiRequest, NextApiResponse} from 'next';
import {applyApiCookie} from 'next-universal-cookie';
import {accessTokenName} from 'utils/auth';

const TEST_VALID_TOKEN = 'base64_valid';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  applyApiCookie(req, res);

  const authorization = req.headers['authorization'];
  const cookieAuthorization = req.cookies[accessTokenName];

  if (req.method === 'GET') {
    if (
      authorization === `Bearer ${TEST_VALID_TOKEN}` ||
      cookieAuthorization === TEST_VALID_TOKEN
    ) {
      res.json({
        email: 'john_doe@gmail.com',
      });
    } else {
      // Invalid or expired JWT
      if (authorization) {
        res.status(401);
      }
      res.clearCookie(accessTokenName);
      res.status(204);
      res.end();
    }
  }
}
