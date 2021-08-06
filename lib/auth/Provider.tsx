import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';

import {AuthProvider as BaseAuthProvider} from './Context';
import {AuthProviderProps} from './types';

const AuthProvider = ({
  children,
  isProtected = false,
  session,
}: AuthProviderProps) => {
  const router = useRouter();
  const state = useState(session);

  const shouldFallback = isProtected && !session;
  const shouldRedirect = router.isReady && shouldFallback;

  useEffect(() => {
    if (shouldRedirect) {
      router.replace(`/signin?next=${encodeURIComponent(router.asPath)}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router.asPath, shouldRedirect]);

  if (shouldFallback) {
    return <div>Redirecting....</div>;
  }

  return <BaseAuthProvider value={state}>{children}</BaseAuthProvider>;
};

export default AuthProvider;
