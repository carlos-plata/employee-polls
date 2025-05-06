export default function VoteOption({
    text,
    isSelected,
    votesCount,
    percentage,
    disabled,
    onVote,
    showResults,
  }) {
    return (
      <div className={`border rounded-lg p-4 ${isSelected ? 'border-green-500 bg-green-50' : ''}`}>
        <div className="text-center mb-4">
          <p className="text-lg font-medium">{text}</p>
        </div>
        
        {showResults ? (
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
              <div
                className="bg-blue-500 h-4 rounded-full"
                style={{ width: `${percentage}%` }}
              ></div>
            </div>
            <div className="flex justify-between text-sm">
              <span>{votesCount} {votesCount === 1 ? 'vote' : 'votes'}</span>
              <span>{percentage}%</span>
            </div>
            {isSelected && (
              <div className="mt-2 text-center">
                <span className="inline-block px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">
                  Your vote
                </span>
              </div>
            )}
          </div>
        ) : (
          <button
            onClick={onVote}
            disabled={disabled}
            className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-md transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            Click
          </button>
        )}
      </div>
    );
  }
  