import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '../store';
import { AuthProvider } from '../components/auth/AuthContext';
import Layout from '../components/layout/Layout';
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </Provider>
  );
}

export default MyApp;
