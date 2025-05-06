import { formatDate } from '../../utils/helpers';
import VoteOption from './VoteOption';

export default function PollDetails({
  poll,
  author,
  hasVoted,
  hasVotedOption1,
  hasVotedOption2,
  option1Percentage,
  option2Percentage,
  totalVotes,
  onVote,
}) {
  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-6">Poll by {author.name}</h2>
      
      <div className="flex justify-center mb-6">
        {author.avatarURL && (
          <img
            src={author.avatarURL}
            alt={author.name}
            className="w-24 h-24 rounded-full"
          />
        )}
      </div>
      
      <h3 className="text-xl font-semibold text-center mb-8">Would You Rather</h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <VoteOption
          text={poll.optionOne.text}
          isSelected={hasVotedOption1}
          votesCount={poll.optionOne.votes.length}
          percentage={option1Percentage}
          disabled={hasVoted}
          onVote={() => onVote('optionOne')}
          showResults={hasVoted}
        />
        
        <VoteOption
          text={poll.optionTwo.text}
          isSelected={hasVotedOption2}
          votesCount={poll.optionTwo.votes.length}
          percentage={option2Percentage}
          disabled={hasVoted}
          onVote={() => onVote('optionTwo')}
          showResults={hasVoted}
        />
      </div>
      
      {hasVoted && (
        <div className="mt-6 text-center text-gray-600">
          <p>Total votes: {totalVotes}</p>
        </div>
      )}
    </div>
  );
}
