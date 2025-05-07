import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  users: {},
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    fetchUsersStart(state) {
      state.loading = true;
      state.error = null;
    },
    fetchUsersSuccess(state, action) {
      state.users = action.payload;
      state.loading = false;
    },
    fetchUsersFailure(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    updateUserAnswers(state, action) {
      const { authedUser, qid, answer } = action.payload;
      if (state.users[authedUser]) {
        state.users[authedUser].answers[qid] = answer;
      }
    },
    updateUserQuestions(state, action) {
      const { author, id } = action.payload;
      if (state.users[author]) {
        state.users[author].questions.push(id);
      }
    },
  },
});

export const {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFailure,
  updateUserAnswers,
  updateUserQuestions,
} = usersSlice.actions;

export default usersSlice.reducer;
