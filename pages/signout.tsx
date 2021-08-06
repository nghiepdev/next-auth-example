import {GetServerSideProps} from 'next';
import {applyServerSideCookie} from 'next-universal-cookie';

import {accessTokenName} from 'lib/auth';

export const getServerSideProps: GetServerSideProps = async ctx => {
  applyServerSideCookie(ctx.req, ctx.res);

  ctx.res.clearCookie(accessTokenName);

  return {
    redirect: {
      destination: '/',
      permanent: false,
    },
  };
};

const SignOut = () => {
  return null;
};

export default SignOut;
