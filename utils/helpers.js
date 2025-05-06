// utils/helpers.js
export const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    const time = date.toLocaleTimeString('en-US', { hour: 'numeric', minute: 'numeric', hour12: true });
    const day = date.toLocaleDateString('en-US', { day: 'numeric', month: 'numeric', year: 'numeric' });
    
    return `${time} | ${day}`;
  };
  
  export const formatPoll = (poll, user, users) => {
    const { id, author, timestamp, optionOne, optionTwo } = poll;
    const { name, avatarURL } = users[author];
    
    return {
      id,
      author,
      name,
      avatarURL,
      timestamp,
      optionOne,
      optionTwo,
      hasVoted: 
        optionOne.votes.includes(user.id) || 
        optionTwo.votes.includes(user.id),
      userVote: 
        optionOne.votes.includes(user.id) 
          ? 'optionOne' 
          : optionTwo.votes.includes(user.id) 
            ? 'optionTwo' 
            : null,
    };
  };
  
  export const sortPolls = (polls) => {
    return Object.values(polls).sort((a, b) => b.timestamp - a.timestamp);
  };