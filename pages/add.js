import { useState } from 'react';
import { useRouter } from 'next/router';
import { useDispatch, useSelector } from 'react-redux';
import { handleAddPoll } from '../store/thunks/pollsThunks';
import ProtectedRoute from '../components/layout/ProtectedRoute';
import NewPollForm from '../components/polls/NewPollForm';
import Head from 'next/head';

function AddPoll() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const handleSubmit = async (optionOneText, optionTwoText) => {
    setLoading(true);
    setError(null);
    
    try {
      await dispatch(handleAddPoll(optionOneText, optionTwoText, user.id));
      router.push('/');
    } catch (error) {
      setError(error.message || 'Failed to create poll. Please try again.');
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Create New Poll - Employee Polls</title>
      </Head>
      
      <NewPollForm onSubmit={handleSubmit} loading={loading} error={error} />
    </div>
  );
}

export default ProtectedRoute(AddPoll);
