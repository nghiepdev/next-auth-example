import {getSession} from './get-session';
import {WrapperGetServerSideProps} from './types';

export const getServerSideProps: WrapperGetServerSideProps =
  options => callback => {
    return async context => {
      const session = await getSession(context);

      if (options.isProtected && !session) {
        return {
          redirect: {
            destination: `/signin?next=${encodeURIComponent(
              context.resolvedUrl
            )}`,
            permanent: false,
            ...options.redirect,
          },
        };
      }

      const result = await callback(context);

      if ('props' in result) {
        return {
          ...result,
          props: {
            ...result.props,
            session,
          },
        };
      }

      return {
        ...result,
        props: {
          session,
        },
      };
    };
  };
