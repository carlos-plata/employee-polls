import { useEffect } from 'react';
import { useRouter } from 'next/router';
import Navbar from './Navbar';
import { useAuth } from '../auth/AuthContext';

export default function Layout({ children }) {
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  
  // Excluded paths that don't need authentication
  const publicPaths = ['/login'];
  const isPublicPath = publicPaths.includes(router.pathname);
  
  return (
    <div className="min-h-screen flex flex-col">
      {isAuthenticated && <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
    </div>
  );
}
