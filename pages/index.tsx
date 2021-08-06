import {useSession} from 'lib/auth';

const Home = () => {
  const session = useSession();

  return (
    <div>
      <h1>Client page</h1>
      <strong>Signed in as</strong>: {session?.email}
    </div>
  );
};

export default Home;
