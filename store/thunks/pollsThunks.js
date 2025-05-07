import { 
    fetchPollsStart, 
    fetchPollsSuccess, 
    fetchPollsFailure,
    addPoll,
    savePollAnswer
  } from '../slices/pollsSlice';
  import { 
    fetchUsersStart, 
    fetchUsersSuccess, 
    fetchUsersFailure,
    updateUserAnswers,
    updateUserQuestions
  } from '../slices/usersSlice';
  import { 
    _getQuestions, 
    _getUsers, 
    _saveQuestion, 
    _saveQuestionAnswer 
  } from '../../utils/_DATA';
  
  // Fetch initial data (polls and users)
  export const fetchInitialData = () => async (dispatch) => {
    dispatch(fetchPollsStart());
    dispatch(fetchUsersStart());
    
    try {
      const [questions, users] = await Promise.all([
        _getQuestions(),
        _getUsers(),
      ]);
      
      dispatch(fetchPollsSuccess(questions));
      dispatch(fetchUsersSuccess(users));
    } catch (error) {
      dispatch(fetchPollsFailure(error.message));
      dispatch(fetchUsersFailure(error.message));
    }
  };
  
  // Create a new poll
  export const handleAddPoll = (optionOneText, optionTwoText, author) => async (dispatch) => {
    try {
      const formattedQuestion = await _saveQuestion({
        optionOneText,
        optionTwoText,
        author,
      });
      
      dispatch(addPoll(formattedQuestion));
      dispatch(updateUserQuestions(formattedQuestion));
      
      return formattedQuestion;
    } catch (error) {
      console.error('Error in handleAddPoll: ', error);
      throw error;
    }
  };
  
  // Answer a poll
  export const handleAnswerPoll = (authedUser, qid, answer) => async (dispatch) => {
    try {
      await _saveQuestionAnswer({
        authedUser,
        qid,
        answer,
      });
      
      dispatch(savePollAnswer({ authedUser, qid, answer }));
      dispatch(updateUserAnswers({ authedUser, qid, answer }));
    } catch (error) {
      console.error('Error in handleAnswerPoll: ', error);
      throw error;
    }
  };
  