import {GetServerSideProps} from 'next';
import {applyServerSidePropsCookie} from 'next-universal-cookie';
import {accessTokenName} from 'utils/auth';

export const getServerSideProps: GetServerSideProps = async ctx => {
  applyServerSidePropsCookie(ctx.req, ctx.res);

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
