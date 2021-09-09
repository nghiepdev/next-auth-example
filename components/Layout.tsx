import Link from 'next/link';
import {useRouter} from 'next/router';

import {useSession} from 'core/authenticated';
type Props = React.PropsWithChildren<{}>;

const Layout = ({children}: Props) => {
  const router = useRouter();
  const session = useSession();

  return (
    <div>
      <h1>
        Authentication In Next.js - Repo{' '}
        <a href='https://github.com/nghiepit/next-auth-example'>
          next-auth-example
        </a>
      </h1>
      <div>
        <ul>
          <li>
            <Link href='/'>
              <a>Client</a>
            </Link>
          </li>
          <li>
            <Link href='/server'>
              <a>Server</a>
            </Link>
          </li>
          <li>
            <Link href='/protected'>
              <a>Protected</a>
            </Link>
          </li>
        </ul>
      </div>
      {children}

      <div>
        {session ? (
          <a href='/logout'>Sign out</a>
        ) : (
          router.pathname !== '/signin' && (
            <div>
              <hr />
              <strong>
                You are not signed in{' '}
                <Link href='/signin'>
                  <a>Sign in</a>
                </Link>
              </strong>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default Layout;
