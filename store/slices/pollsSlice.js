// store/slices/pollsSlice.js
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  polls: {},
  loading: false,
  error: null,
};

const pollsSlice = createSlice({
  name: 'polls',
  initialState,
  reducers: {
    fetchPollsStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchPollsSuccess(state, action) {
      state.polls = action.payload;
      state.loading = false;
    },
    fetchPollsFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    addPoll(state, action) {
      state.polls[action.payload.id] = action.payload;
    },
    savePollAnswer(state, action) {
      const { authedUser, qid, answer } = action.payload;
      const poll = state.polls[qid];
      
      if (poll) {
        poll[answer].votes.push(authedUser);
      }
    },
  },
});

export const {
  fetchPollsStart,
  fetchPollsSuccess,
  fetchPollsFailure,
  addPoll,
  savePollAnswer,
} = pollsSlice.actions;

export default pollsSlice.reducer;
