import type {AppProps} from 'next/app';

import Layout from 'components/Layout';
import {AuthProvider} from 'lib/auth';

const MyApp = ({Component, pageProps}: AppProps) => {
  return (
    <AuthProvider
      isProtected={pageProps.isProtected}
      session={pageProps.session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
};
export default MyApp;
