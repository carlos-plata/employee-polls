import { 
  _saveQuestion, 
  _saveQuestionAnswer,
  _getUsers,
  _getQuestions 
} from '../utils/_DATA';

// Test _saveQuestion function
describe('_saveQuestion', () => {
  // Test 1: Verify that the saved question is returned with all expected fields
  it('returns the saved question with all expected fields when correctly formatted data is passed', async () => {
    // Arrange
    const questionData = {
      optionOneText: 'Option One Text',
      optionTwoText: 'Option Two Text',
      author: 'sarahedo'
    };

    // Act
    const savedQuestion = await _saveQuestion(questionData);

    // Assert
    expect(savedQuestion).toBeDefined();
    expect(savedQuestion.id).toBeDefined();
    expect(savedQuestion.timestamp).toBeDefined();
    expect(savedQuestion.author).toBe('sarahedo');
    expect(savedQuestion.optionOne.text).toBe('Option One Text');
    expect(savedQuestion.optionOne.votes).toEqual([]);
    expect(savedQuestion.optionTwo.text).toBe('Option Two Text');
    expect(savedQuestion.optionTwo.votes).toEqual([]);
  });

  // Test 2: Verify that an error is returned if incorrect data is passed
  it('returns an error if incorrect data is passed', async () => {
    // Arrange
    const incorrectData = {
      optionOneText: '',
      author: 'sarahedo'
      // Missing optionTwoText
    };

    // Act & Assert
    await expect(_saveQuestion(incorrectData)).rejects.toBeDefined();
  });
});

// Test _saveQuestionAnswer function
describe('_saveQuestionAnswer', () => {
  // Test 3: Verify that true is returned when correctly formatted data is passed
  it('returns true when correctly formatted data is passed', async () => {
    // Arrange
    const answerData = {
      authedUser: 'sarahedo',
      qid: '8xf0y6ziyjabvozdd253nd',
      answer: 'optionOne'
    };

    // Act
    const result = await _saveQuestionAnswer(answerData);

    // Assert
    expect(result).toBe(true);
  });

  // Test 4: Verify that an error is returned if incorrect data is passed
  it('returns an error if incorrect data is passed', async () => {
    // Arrange
    const incorrectData = {
      authedUser: 'sarahedo',
      // Missing qid
      answer: 'optionOne'
    };

    // Act & Assert
    await expect(_saveQuestionAnswer(incorrectData)).rejects.toBeDefined();
  });
});
