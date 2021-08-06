import Link from 'next/link';
import {useRouter} from 'next/router';

import {useSession} from 'lib/auth';
type Props = React.PropsWithChildren<{}>;

const Layout = ({children}: Props) => {
  const router = useRouter();
  const session = useSession();

  return (
    <div>
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
          <Link href='/signout'>
            <a target='_top'>Sign out</a>
          </Link>
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
