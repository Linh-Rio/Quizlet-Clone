import classNames from 'classnames/bind';
import styles from './LearnStyle.module.scss';
import { Link, useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import FeatureHeader from '../../components/FeatureHeader/FeatureHeader';
import { useDispatch, useSelector } from 'react-redux';
import { getSetDetail } from '../../redux/slices/studySet';
import Question from '../../components/Question/Question';

const cx = classNames.bind(styles);

const Learn = () => {
  const { setId } = useParams();
  const studySet = useSelector((state) => state.studySet.setDetail);
  const dispatch = useDispatch();

  const [listQuestion, setListQuestion] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [isResult, setIsResult] = useState(false);
  const [userAnswer, setUserAnswer] = useState(null);
  const [currentAnswer, setcurrentAnswer] = useState(null);

  useEffect(() => {
    dispatch(getSetDetail(setId));
    //error 404 not resolve. It can resolve after
  }, [setId, dispatch]);

  useEffect(() => {
    if (studySet?.FlashCards) {
      const questListuesFormatted = studySet.FlashCards.map(
        (term) => {
          return formatQuestion(term.front, term.back);
        },
      );
      setListQuestion(questListuesFormatted);
    }
  }, [studySet]);

  const generateAlphabetArray = () => {
    let alphabet = [];

    for (let i = 97; i <= 122; i++) {
      // ASCII values for a-z
      alphabet.push(String.fromCharCode(i));
    }
    return alphabet;
  };

  const alphabetArray = generateAlphabetArray();

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

  const handleSelectAnswer = (answerIndex) => {
    setUserAnswer(answerIndex);
    setcurrentAnswer(
      alphabetArray.indexOf(
        listQuestion[currentQuestion].correctAnswer.toLowerCase(),
      ),
    );
    setIsResult(true);
  };

  const handleClickContinue = () => {
    setCurrentQuestion((prev) => {
      if (
        prev < listQuestion.length - 1 &&
        userAnswer === currentAnswer
      ) {
        return prev + 1;
      }
      return prev;
    });
    setIsResult(false);
    setUserAnswer(null);
    setcurrentAnswer(null);
  };

  return (
    <div className={cx('container')}>
      <FeatureHeader
        pageFeature="Learn"
        setId={setId}
        studySet={studySet}
      />

      <Question
        question={listQuestion[currentQuestion]?.question}
        answers={listQuestion[currentQuestion]?.answers}
        disabled={isResult}
        correctAnswer={currentAnswer}
        result={userAnswer === currentAnswer}
        userAnswer={userAnswer}
        onSelectAnswer={(answerIndex) =>
          handleSelectAnswer(answerIndex)
        }
      />

      <div className={cx('next-question', { hidden: !isResult })}>
        {currentQuestion === listQuestion?.length - 1 &&
        userAnswer === currentAnswer ? (
          <>
            <div>You learn all term</div>
            <Link
              to={`/${setId}/test`}
              onClick={handleClickContinue}
              className={cx('btn-continue')}
            >
              Test
            </Link>
          </>
        ) : (
          <>
            <div>Press any key to continue</div>
            <button
              onClick={handleClickContinue}
              className={cx('btn-continue')}
            >
              Continue
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Learn;
