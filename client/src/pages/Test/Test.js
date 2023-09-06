import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import styles from './TestStyle.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getSetDetail } from '../../redux/slices/studySet';
import { useNavigate, useParams } from 'react-router-dom';
import FeatureHeader from '../../components/FeatureHeader/FeatureHeader';
import TestModal from '../../components/TestModal/TestModal';
import Question from '../../components/Question/Question';
import {
  getQuestionList,
  getUserAnswer,
} from '../../redux/slices/test';

const cx = classNames.bind(styles);

const Test = () => {
  const dispatch = useDispatch();
  const { setId } = useParams();
  const navigate = useNavigate();
  const studySet = useSelector((state) => state.studySet.setDetail);
  const setting = useSelector((state) => state.test?.setting);
  const questionList = useSelector(
    (state) => state.test?.questionList,
  );

  const [listFlashCard, setListFlashCard] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  useEffect(() => {
    dispatch(getSetDetail(setId));
  }, [dispatch, setId]);

  useEffect(() => {
    setListFlashCard(studySet?.FlashCards);
  }, [studySet]);

  useEffect(() => {
    let listQuestionList = [];
    if (studySet?.FlashCards && setting?.numberQuestion) {
      listQuestionList = getRandomQuestionList(
        studySet.FlashCards,
        setting.numberQuestion,
      );
    }

    dispatch(getQuestionList(listQuestionList));
  }, [setting, studySet, dispatch]);

  const formatQuestion = (questionString, correctAnswer) => {
    const answerIndexRegex = /[aA]\.\s|\[[aA]\]\n/;
    const match = questionString?.match(answerIndexRegex);

    if (!match) {
      return null; // Return null or handle the case where no valid answer index is found
    }

    const firstAnswerIndex = match.index;
    const question = questionString
      .substring(0, firstAnswerIndex)
      .trim();

    const answerSection = questionString.substring(firstAnswerIndex);

    const answers = answerSection
      .split(/[a-zA-Z]\.\s|\[[a-zA-Z]\]\n/)
      .slice(1) // Remove the first empty element from the split
      .filter((answer) => answer.length > 0)
      .map((answer) => {
        return answer.trim();
      });

    const questionObject = {
      question: question,
      answers: answers,
      correctAnswer,
    };

    return questionObject;
  };

  const getRandomQuestionList = (arr, numElements) => {
    //copy array
    const arrCopy = [...arr];

    const questionList = [];
    while (questionList.length < numElements && arrCopy.length > 0) {
      const randomIndex = Math.floor(Math.random() * arrCopy.length);
      const questionFormatted = formatQuestion(
        arrCopy[randomIndex].front,
        arrCopy[randomIndex].back,
      );
      if (questionFormatted !== null) {
        questionList.push(questionFormatted);
      }
      arrCopy.splice(randomIndex, 1);
    }
    return questionList;
  };

  const handleAnswerSelection = (questionIndex, answerIndex) => {
    setSelectedAnswers((prevSelectedAnswers) => {
      let updatedSelectedAnswers = [...prevSelectedAnswers];
      if (updatedSelectedAnswers[questionIndex] === answerIndex) {
        updatedSelectedAnswers[questionIndex] = null; // Remove answer if it's already selected
      } else {
        updatedSelectedAnswers[questionIndex] = parseInt(answerIndex); // Select answer if not already selected
      }
      return updatedSelectedAnswers;
    });
  };

  const handleSubmitTest = () => {
    dispatch(getUserAnswer(selectedAnswers));
    navigate(`/${setId}/result`);
  };

  return (
    <div className={cx('container')}>
      <FeatureHeader
        pageFeature="Test"
        studySet={studySet}
        setId={setId}
      />
      <TestModal studySet={studySet} listFlashCard={listFlashCard} />
      <div className={cx('question-list-container')}>
        {questionList?.map((question, index) => {
          return (
            <Question
              question={question.question}
              answers={question.answers}
              index={index + 1}
              totalQuestion={setting.numberQuestion}
              onSelectAnswer={(answerIndex) =>
                handleAnswerSelection(index, answerIndex)
              }
              key={index}
            />
          );
        })}
      </div>
      <div className={cx('submit-test')}>
        {selectedAnswers?.filter((element) => element !== null)
          .length === questionList?.length ? (
          <>
            <div>All done! Ready to submit your test?</div>
            <button
              onClick={handleSubmitTest}
              className={cx('button')}
            >
              Submit test
            </button>
          </>
        ) : (
          <div>Please answer all questions before submitting.</div>
        )}
      </div>
    </div>
  );
};

export default Test;
