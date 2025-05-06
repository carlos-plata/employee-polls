import PollCard from './PollCard';

export default function PollList({ polls, users }) {
  if (!polls.length) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No polls available.</p>
      </div>
    );
  }
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {polls.map((poll) => (
        <PollCard 
          key={poll.id} 
          poll={poll} 
          author={users[poll.author]} 
        />
      ))}
    </div>
  );
}
