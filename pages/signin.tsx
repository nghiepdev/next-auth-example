import ky from 'ky-universal';
import {useRouter} from 'next/router';

import {Me} from 'utils/auth/types';

const SignIn = () => {
  const router = useRouter();

  const handleSignIn = async () => {
    const data = await ky
      .post('/api/auth', {
        headers: {
          'Content-Type': 'application/json',
        },
        json: {},
      })
      .json<Me>();

    console.log(data);

    window.location.replace((router.query.next as string) ?? '/');
  };

  return (
    <div>
      <h1>Sign in to access your protected page</h1>
      <button onClick={handleSignIn}>Click to Login</button>
    </div>
  );
};

export default SignIn;