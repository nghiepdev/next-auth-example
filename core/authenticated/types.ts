import {
  GetServerSideProps,
  GetServerSidePropsContext,
  GetServerSidePropsResult,
  Redirect,
} from 'next';

interface Me {
  email: string;
}

export interface SessionState {
  me: Me;
  access_token: string;
}

export type WrapperOptions =
  | {isProtected: false}
  | {isProtected: true; redirect?: Redirect};

export type WrapperGetServerSideProps = <
  P extends Record<string, unknown> = Record<string, unknown>
>(
  options: WrapperOptions
) => (callback: GetServerSideProps<P>) => (
  context: GetServerSidePropsContext
) => Promise<
  GetServerSidePropsResult<
    P & {
      session?: SessionState;
    }
  >
>;
