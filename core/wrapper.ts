import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  Redirect,
} from 'next';

import {getSession} from 'core/authenticated';
import {SessionState} from 'core/authenticated';

type WrapperOptions =
  | {isProtected: false}
  | {isProtected: true; redirect?: Redirect};

type WrapperGetServerSideProps = <
  P extends Record<string, unknown> = Record<string, unknown>
>(
  options: WrapperOptions
) => (callback: GetServerSideProps<P>) => (
  context: GetServerSidePropsContext
) => Promise<
  GetServerSidePropsResult<
    P & {
      session?: SessionState | null;
    }
  >
>;

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
