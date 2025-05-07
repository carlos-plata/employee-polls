import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import PollDetails from '../../components/polls/PollDetails';

describe('PollDetails', () => {
  // Mock poll data
  const mockPoll = {
    id: 'poll123',
    author: 'sarahedo',
    timestamp: 1467166872634,
    optionOne: {
      votes: ['sarahedo'],
      text: 'Build our new application with Javascript',
    },
    optionTwo: {
      votes: [],
      text: 'Build our new application with Typescript',
    },
  };

  // Mock author data
  const mockAuthor = {
    id: 'sarahedo',
    name: 'Sarah Edo',
    avatarURL: '/avatars/sarah.png',
  };

  // Test 9: Verify that the poll details display correctly
  it('displays poll details correctly', () => {
    // Arrange
    const mockOnVote = jest.fn();
    
    // Act
    render(
      <PollDetails
        poll={mockPoll}
        author={mockAuthor}
        hasVoted={false}
        hasVotedOption1={false}
        hasVotedOption2={false}
        option1Percentage={0}
        option2Percentage={0}
        totalVotes={1}
        onVote={mockOnVote}
      />
    );
    
    // Assert
    expect(screen.getByText(/poll by sarah edo/i)).toBeInTheDocument();
    expect(screen.getByText(/would you rather/i)).toBeInTheDocument();
    expect(screen.getByText(/build our new application with javascript/i)).toBeInTheDocument();
    expect(screen.getByText(/build our new application with typescript/i)).toBeInTheDocument();
  });

  // Test 10: Verify that the percentage of votes is calculated correctly for answered polls
  it('calculates and displays vote percentages correctly for answered polls', () => {
    // Arrange
    const mockOnVote = jest.fn();
    
    // Act
    render(
      <PollDetails
        poll={mockPoll}
        author={mockAuthor}
        hasVoted={true}
        hasVotedOption1={true}
        hasVotedOption2={false}
        option1Percentage={100}
        option2Percentage={0}
        totalVotes={1}
        onVote={mockOnVote}
      />
    );
    
    // Assert
    // Use getAllByText to handle multiple elements with the same text
    const percentages100 = screen.getAllByText(/100%/i);
    const percentages0 = screen.getAllByText(/0%/i);
    
    expect(percentages100.length).toBeGreaterThan(0);
    expect(percentages0.length).toBeGreaterThan(0);
    expect(screen.getByText(/total votes: 1/i)).toBeInTheDocument();
    expect(screen.getByText(/your vote/i)).toBeInTheDocument();
  });
});