import {GetServerSideProps} from 'next';

import {ServerSideProps} from 'types/types';
import {getSession, useSession} from 'utils/auth';

export const getServerSideProps: GetServerSideProps<ServerSideProps> =
  async ctx => {
    return {
      props: {
        cookie: ctx.req.headers.cookie ?? '',
        session: await getSession(ctx),
      },
    };
  };

const Server = () => {
  const session = useSession();

  return (
    <div>
      <h1>Server page</h1>
      <strong>Signed in as</strong>: {session?.email}
    </div>
  );
};

export default Server;
