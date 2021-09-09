import * as wrapper from 'core/wrapper';
import {useSession} from 'core/authenticated';

export const getServerSideProps = wrapper.getServerSideProps({
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
      <strong>Signed in as</strong>: {session?.me.email}
    </div>
  );
};

export default Protected;
