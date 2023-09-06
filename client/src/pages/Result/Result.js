import React from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import styles from './ResultStyle.module.scss';
import Question from '../../components/Question/Question';
import FeatureHeader from '../../components/FeatureHeader/FeatureHeader';
import { Link, useParams } from 'react-router-dom';

const cx = classNames.bind(styles);

const Result = () => {
  const { setId } = useParams();
  const studySet = useSelector((state) => state.studySet.setDetail);

  const { questionList, userAnswer } = useSelector(
    (state) => state.test,
  );

  const generateAlphabetArray = () => {
    let alphabet = [];

    for (let i = 97; i <= 122; i++) {
      // ASCII values for a-z
      alphabet.push(String.fromCharCode(i));
    }
    return alphabet;
  };

  const alphabetArray = generateAlphabetArray();

  // Calculate the total number of correct answers
  const resultArray = questionList.map((question, index) => {
    const isAnswerCorrect =
      question.correctAnswer.toLowerCase() ===
      alphabetArray[userAnswer[index]];

    return isAnswerCorrect;
  });

  //get total answer is true
  const totalCorrectAnswer = resultArray.reduce(
    (result, answer) => (answer ? result + 1 : result),
    0,
  );

  const result = (
    (totalCorrectAnswer / resultArray.length) *
    100
  ).toFixed(2);
  return (
    <div className={cx('container')}>
      <FeatureHeader
        pageFeature={'Test'}
        studySet={studySet}
        setId={setId}
      />
      <div className={cx('result-container')}>
        <div>{`Result: ${result} %`}</div>
        <div>{`Total correct answer: ${totalCorrectAnswer}/${resultArray.length}`}</div>
        <Link className={cx('test-again')} to={`/${setId}/test`}>
          Test again!
        </Link>
      </div>
      <div className={cx('question-list-container')}>
        {questionList?.map((question, index) => {
          return (
            <Question
              question={question.question}
              answers={question.answers}
              index={index + 1}
              totalQuestion={questionList?.length}
              disabled="true"
              correctAnswer={alphabetArray.indexOf(
                question.correctAnswer.toLowerCase(),
              )}
              result={resultArray[index]}
              userAnswer={userAnswer[index]}
              key={index}
            />
          );
        })}
      </div>
      <div className={cx('total-score')}></div>
    </div>
  );
};

export default Result;
