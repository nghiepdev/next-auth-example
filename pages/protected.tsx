import {GetServerSideProps} from 'next';

import {ServerSideProps} from 'types/types';
import {getSession, useSession} from 'utils/auth';

export const getServerSideProps: GetServerSideProps<ServerSideProps> =
  async ctx => {
    return {
      props: {
        isProtected: true,
        session: await getSession(ctx),
      },
    };
  };

const Protected = () => {
  const session = useSession();

  return (
    <div>
      <h1>Protected page</h1>
      <strong>Signed in as</strong>: {session?.email}
    </div>
  );
};

export default Protected;
