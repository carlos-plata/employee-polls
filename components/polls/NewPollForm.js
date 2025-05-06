import { useState } from 'react';

export default function NewPollForm({ onSubmit, loading, error }) {
  const [optionOne, setOptionOne] = useState('');
  const [optionTwo, setOptionTwo] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(optionOne, optionTwo);
  };
  
  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-center mb-2">Would You Rather</h2>
      <p className="text-center text-gray-600 mb-6">Create Your Own Poll</p>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="optionOne" className="block text-sm font-medium text-gray-700 mb-1">
            First Option
          </label>
          <input
            type="text"
            id="optionOne"
            value={optionOne}
            onChange={(e) => setOptionOne(e.target.value)}
            placeholder="Option One"
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        
        <div className="mb-6">
          <label htmlFor="optionTwo" className="block text-sm font-medium text-gray-700 mb-1">
            Second Option
          </label>
          <input
            type="text"
            id="optionTwo"
            value={optionTwo}
            onChange={(e) => setOptionTwo(e.target.value)}
            placeholder="Option Two"
            required
            className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
          />
        </div>
        
        <div className="flex justify-center">
          <button
            type="submit"
            disabled={loading || !optionOne || !optionTwo}
            className="px-6 py-2 bg-blue-500 text-white font-medium rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            {loading ? 'Submitting...' : 'Submit'}
          </button>
        </div>
      </form>
    </div>
  );
}