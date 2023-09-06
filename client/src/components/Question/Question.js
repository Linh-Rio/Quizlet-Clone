import classNames from 'classnames/bind';
import styles from './QuestionStyle.module.scss';
import { useState } from 'react';

const cx = classNames.bind(styles);

const Question = ({
  question,
  answers,
  index,
  totalQuestion,
  onSelectAnswer,
  disabled = false,
  correctAnswer,
  result,
  userAnswer,
}) => {
  const [selectedAnswerIndex, setSelectedAnswerIndex] =
    useState(null);
  const handleAnswerClick = (index) => {
    if (!disabled) {
      if (selectedAnswerIndex === index) {
        setSelectedAnswerIndex(null); // Unselect if already selected
      } else {
        setSelectedAnswerIndex(index); // Select if not already selected
      }
      onSelectAnswer(index);
    }
  };

  return (
    <div className={cx('question-container')}>
      <div className={cx('question')}>
        <div className={cx('lable')}>
          <span>Definition</span>
          <span>
            {index && totalQuestion
              ? `${index} of ${totalQuestion}`
              : undefined}
          </span>
        </div>
        <div className={cx('content-question')}>
          <p>{question}</p>
        </div>
      </div>
      <div className={cx('answer')}>
        <div className={cx('lable')}>Select the correct term</div>
        <div className={cx('content-answser')}>
          {answers?.map((answer, index) => {
            return (
              <button
                className={cx('option-answer', {
                  selected: selectedAnswerIndex === index,
                  disabled: disabled,
                  correct: correctAnswer === index,
                  incorrect: result === false && index === userAnswer,
                })}
                onClick={() => handleAnswerClick(index)}
                key={index}
                disable={disabled.toString()}
              >
                <span>{answer}</span>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Question;
