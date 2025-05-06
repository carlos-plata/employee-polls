import { useSelector } from 'react-redux';
import ProtectedRoute from '../components/layout/ProtectedRoute';
import LeaderboardTable from '../components/leaderboard/LeaderboardTable';
import Head from 'next/head';

function Leaderboard() {
  const { users } = useSelector((state) => state.users);
  
  if (!users) {
    return <div className="text-center py-10">Loading...</div>;
  }
  
  const leaderboardData = Object.values(users)
    .map((user) => ({
      id: user.id,
      name: user.name,
      avatarURL: user.avatarURL,
      answeredCount: Object.keys(user.answers).length,
      createdCount: user.questions.length,
      totalScore: Object.keys(user.answers).length + user.questions.length,
    }))
    .sort((a, b) => b.totalScore - a.totalScore);
  
  return (
    <div className="container mx-auto p-4">
      <Head>
        <title>Leaderboard - Employee Polls</title>
      </Head>
      
      <LeaderboardTable users={leaderboardData} />
    </div>
  );
}

export default ProtectedRoute(Leaderboard);
