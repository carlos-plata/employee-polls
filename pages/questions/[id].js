import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { useSelector, useDispatch } from 'react-redux';
import { handleAnswerPoll } from '../../store/thunks/pollsThunks';
import ProtectedRoute from '../../components/layout/ProtectedRoute';
import PollDetails from '../../components/polls/PollDetails';
import Head from 'next/head';

function PollPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = router.query;
  
  const { polls, loading } = useSelector((state) => state.polls);
  const { users } = useSelector((state) => state.users);
  const { user } = useSelector((state) => state.auth);
  
  const [poll, setPoll] = useState(null);
  const [author, setAuthor] = useState(null);
  const [notFound, setNotFound] = useState(false);
  
  useEffect(() => {
    if (id && polls && users) {
      const currentPoll = polls[id];
      
      if (currentPoll) {
        setPoll(currentPoll);
        setAuthor(users[currentPoll.author]);
      } else {
        setNotFound(true);
      }
    }
  }, [id, polls, users]);
  
  const handleVote = async (answer) => {
    try {
      await dispatch(handleAnswerPoll(user.id, id, answer));
      // The poll will update automatically via Redux
    } catch (error) {
      console.error('Error voting:', error);
    }
  };
  
  if (notFound) {
    router.push('/404');
    return null;
  }
  
  if (loading || !poll || !author) {
    return <div className="text-center py-10">Loading...</div>;
  }
  
  const hasVotedOption1 = poll.optionOne.votes.includes(user.id);
  const hasVotedOption2 = poll.optionTwo.votes.includes(user.id);
  const hasVoted = hasVotedOption1 || hasVotedOption2;
  
  const totalVotes = poll.optionOne.votes.length + poll.optionTwo.votes.length;
  const option1Percentage = totalVotes ? Math.round((poll.optionOne.votes.length / totalVotes) * 100) : 0;
  const option2Percentage = totalVotes ? Math.round((poll.optionTwo.votes.length / totalVotes) * 100) : 0;
  
  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Poll by {author.name} - Employee Polls</title>
      </Head>
      
      <div className="mb-4">
        <Link href="/" className="text-blue-600 hover:text-blue-800">
          &larr; Back to Home
        </Link>
      </div>
      
      <PollDetails
        poll={poll}
        author={author}
        hasVoted={hasVoted}
        hasVotedOption1={hasVotedOption1}
        hasVotedOption2={hasVotedOption2}
        option1Percentage={option1Percentage}
        option2Percentage={option2Percentage}
        totalVotes={totalVotes}
        onVote={handleVote}
      />
    </div>
  );
}

export default ProtectedRoute(PollPage);