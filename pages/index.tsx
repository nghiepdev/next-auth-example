import {useSession} from 'core/authenticated';

const Home = () => {
  const session = useSession();

  return (
    <div>
      <h1>Client page</h1>
      <strong>Signed in as</strong>: {session?.me.email}
    </div>
  );
};

export default Home;
