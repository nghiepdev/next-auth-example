import * as wrapper from 'core/wrapper';
import {useSession} from 'core/authenticated';

export const getServerSideProps = wrapper.getServerSideProps({
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
      <strong>Signed in as</strong>: {session?.me.email}
    </div>
  );
};

export default Server;
