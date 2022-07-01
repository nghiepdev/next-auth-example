import {useSession, withAuth} from 'core/authenticated';

export const getServerSideProps = withAuth.getServerSideProps({
  isProtected: false,
})(async context => {
  return {
    props: {},
  };
});

const Server = () => {
  const session = useSession();

  return (
    <div>
      <h1>Server page</h1>
      <strong>Signed in as</strong>: <mark>{session?.me.email}</mark>
    </div>
  );
};

export default Server;
