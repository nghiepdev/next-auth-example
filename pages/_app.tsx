import {useState} from 'react';
import type {AppProps} from 'next/app';

import Layout from 'components/Layout';
import {AuthProvider} from 'core/authenticated';

const MyApp = ({Component, pageProps}: AppProps) => {
  const session = useState(pageProps.session);

  return (
    <AuthProvider value={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
};

export default MyApp;
