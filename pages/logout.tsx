import {GetServerSideProps} from 'next';
import {applyServerSideCookie} from 'next-universal-cookie';

import {accessTokenName} from 'core/authenticated';

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

const Logout = () => {
  return null;
};

export default Logout;
