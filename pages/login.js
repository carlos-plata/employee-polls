import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector } from 'react-redux';
import LoginForm from '../components/auth/LoginForm';
import Head from 'next/head';

export default function Login() {
  const router = useRouter();
  const { isAuthenticated } = useSelector((state) => state.auth);
  const { redirect } = router.query;
  
  useEffect(() => {
    if (isAuthenticated) {
      router.push(redirect || '/');
    }
  }, [isAuthenticated, redirect, router]);
  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gray-50">
      <Head>
        <title>Login - Employee Polls</title>
      </Head>
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold text-gray-900">Employee Polls</h1>
          <div className="mt-4 mb-8">
            <img 
              src="/avatars/employee-polls-logo.png" 
              alt="Employee Polls Logo" 
              className="mx-auto h-48 w-auto"
            />
          </div>
          <h2 className="mt-6 text-2xl font-bold text-gray-900">Log In</h2>
        </div>
        <LoginForm />
      </div>
    </div>
  );
}
