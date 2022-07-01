import {useSession, withAuth} from 'core/authenticated';

export const getServerSideProps = withAuth.getServerSideProps({
  isProtected: true,
})(async context => {
  return {
    props: {},
  };
});

const Protected = () => {
  const session = useSession();

  return (
    <div>
      <h1>Protected page</h1>
      <strong>Signed in as</strong>: <mark>{session?.me.email}</mark>
    </div>
  );
};

export default Protected;
