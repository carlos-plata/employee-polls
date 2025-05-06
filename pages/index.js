import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useSelector, useDispatch } from 'react-redux';
import { fetchInitialData } from '../store/thunks/pollsThunks';
import PollList from '../components/polls/PollList';
import ProtectedRoute from '../components/layout/ProtectedRoute';
import { sortPolls } from '../utils/helpers';

function Home() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [activeTab, setActiveTab] = useState('unanswered');
  
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { polls } = useSelector((state) => state.polls);
  const { users } = useSelector((state) => state.users);
  
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(fetchInitialData());
    }
  }, [dispatch, isAuthenticated]);
  
  if (!isAuthenticated) {
    return null;
  }
  
  const allPolls = sortPolls(polls);
  
  const answeredPolls = allPolls.filter((poll) => 
    poll.optionOne.votes.includes(user.id) || 
    poll.optionTwo.votes.includes(user.id)
  );
  
  const unansweredPolls = allPolls.filter((poll) => 
    !poll.optionOne.votes.includes(user.id) && 
    !poll.optionTwo.votes.includes(user.id)
  );
  
  return (
    <div className="container mx-auto p-4">
      <div className="mb-6">
        <div className="tabs border-b mb-4">
          <button
            className={`tab px-4 py-2 ${activeTab === 'unanswered' ? 'active font-bold border-b-2 border-blue-500' : ''}`}
            onClick={() => setActiveTab('unanswered')}
          >
            New Questions
          </button>
          <button
            className={`tab px-4 py-2 ${activeTab === 'answered' ? 'active font-bold border-b-2 border-blue-500' : ''}`}
            onClick={() => setActiveTab('answered')}
          >
            Done
          </button>
        </div>
        
        <div>
          {activeTab === 'unanswered' ? (
            <PollList polls={unansweredPolls} users={users} />
          ) : (
            <PollList polls={answeredPolls} users={users} />
          )}
        </div>
      </div>
    </div>
  );
}

export default ProtectedRoute(Home);
