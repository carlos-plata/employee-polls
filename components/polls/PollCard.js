import Link from 'next/link';
import { formatDate } from '../../utils/helpers';

export default function PollCard({ poll, author }) {
  return (
    <div className="border rounded-lg p-4 mb-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="text-center mb-2">
        <h3 className="font-medium">{author?.name || 'Unknown User'}</h3>
        <p className="text-sm text-gray-500">{formatDate(poll.timestamp)}</p>
      </div>
      
      <Link 
        href={`/questions/${poll.id}`}
        className="block w-full mt-2 py-2 px-4 bg-green-100 hover:bg-green-200 text-green-700 text-center rounded-md transition-colors"
      >
        Show
      </Link>
    </div>
  );
}