import Link from 'next/link';
import Head from 'next/head';

export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-12 bg-gray-50">
      <Head>
        <title>404 - Page Not Found</title>
      </Head>
      
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <h2 className="text-3xl font-semibold text-gray-700 mt-2">Page Not Found</h2>
        <p className="text-gray-600 mt-4">The poll you're looking for doesn't exist or isn't available.</p>
        <Link 
          href="/"
          className="mt-8 inline-block px-6 py-3 text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Return to Dashboard
        </Link>
      </div>
    </div>
  );
}