import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '../auth/AuthContext';

const ProtectedRoute = (Component) => {
  const AuthenticatedComponent = (props) => {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();
    
    useEffect(() => {
      if (!loading && !isAuthenticated) {
        router.replace({
          pathname: '/login',
          query: { redirect: router.asPath },
        });
      }
    }, [isAuthenticated, loading, router]);
    
    if (loading) {
      return <div className="text-center py-10">Loading...</div>;
    }
    
    if (!isAuthenticated) {
      return null;
    }
    
    return <Component {...props} />;
  };
  
  return AuthenticatedComponent;
};

export default ProtectedRoute;