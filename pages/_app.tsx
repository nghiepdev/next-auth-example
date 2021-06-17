import type {AppProps} from 'next/app';
import {NextCookieProvider} from 'next-universal-cookie';

import Layout from 'components/Layout';
import {AuthProvider} from 'utils/auth';

const MyApp = ({Component, pageProps}: AppProps) => {
  return (
    <NextCookieProvider cookie={pageProps.cookie}>
      <AuthProvider
        isProtected={pageProps.isProtected}
        session={pageProps.session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </NextCookieProvider>
  );
};
export default MyApp;
