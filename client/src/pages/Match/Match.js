import React, { useEffect, useRef, useState } from 'react';
import Header from '../../components/Header/Header';
import classNames from 'classnames/bind';
import styles from './MatchStyle.module.scss';
import Modal from 'react-modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleLeft,
  faCircleNodes,
} from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { getSetDetail } from '../../redux/slices/studySet';
import CardDnD from '../../components/CardDnD/CardDnD';

const cx = classNames.bind(styles);
const Match = () => {
  const dispatch = useDispatch();
  const { setId } = useParams();
  const containerRef = useRef(null);

  const studySet = useSelector((state) => state.studySet.setDetail);
  const [listFlashCard, setListFlashCard] = useState([]);
  const [currentSetGame, setCurrentSetGame] = useState([]);
  const [seconds, setSeconds] = useState(0);
  const [isOpenModal, setIsOpenModal] = useState(true);
  const [isResult, setIsResult] = useState(false);
  const [numberCard, setNumberCard] = useState(0);
  const [intervalId, setIntervalId] = useState(null);

  useEffect(() => {
    dispatch(getSetDetail(setId));
  }, [dispatch, setId]);

  useEffect(() => {
    setListFlashCard(studySet?.FlashCards);
  }, [studySet]);

  useEffect(() => {
    if (containerRef) {
      setNumberCard(containerRef?.current?.children.length);
    }
  }, [containerRef?.current?.children?.length]);

  useEffect(() => {
    console.log(numberCard);
    console.log(isOpenModal);
    if (numberCard === 0 && !isOpenModal) {
      handleGameEnd();
    }
  }, [numberCard]);

  const getRandomQuestionList = (arr, numElements) => {
    //copy array
    const arrCopy = [...arr];

    const questionList = [];
    while (questionList.length < numElements && arrCopy.length > 0) {
      const randomIndex = Math.floor(Math.random() * arrCopy.length);

      questionList.push(arrCopy[randomIndex]);

      arrCopy.splice(randomIndex, 1);
    }
    return questionList;
  };

  const handleStartGame = () => {
    if (listFlashCard) {
      setCurrentSetGame(getRandomQuestionList(listFlashCard, 5));
    }
    setIsOpenModal(false);
    setIsResult(false);
    setSeconds(0);
    const interval = setInterval(() => {
      setSeconds((seconds) => seconds + 1);
    }, 1000);

    setIntervalId(interval);
  };

  const handleGameEnd = () => {
    setIsResult(true);

    clearInterval(intervalId); // Clear the interval when the game ends
  };

  return (
    <div className={cx('container')}>
      <Header />
      {isResult ? (
        <div className={cx('result-container')}>
          <h1 className={cx('title')}>
            Now, can you do even better?
          </h1>
          <h2 className={cx('score')}>
            You completed the turn in {seconds} seconds{' '}
          </h2>
          <div>
            <Link
              to={`/${setId}/${studySet?.title}`}
              className={cx('back-btn')}
            >
              Back to set
            </Link>
            <button
              onClick={handleStartGame}
              className={cx('play-again-btn')}
            >
              Play again
            </button>
          </div>
        </div>
      ) : (
        <div className={cx('body-container')}>
          <div className={cx('side-bar')}>
            <button className={cx('back')}>
              <span className={cx('back-arrow')}>
                <FontAwesomeIcon icon={faAngleLeft} />
              </span>
              <span>Back</span>
            </button>
            <div className={cx('page-name')}>
              <span className={cx('logo')}>
                <FontAwesomeIcon icon={faCircleNodes} />
              </span>
              <span className={cx('text')}>Match</span>
            </div>
            <div className={cx('time-counter')}>
              <div>TIME</div>
              <div className={cx('counter-clock')}>{seconds}</div>
            </div>
          </div>
          <div className={cx('match-container')} ref={containerRef}>
            {currentSetGame?.map((card, index) => {
              return (
                <CardDnD
                  text={card.front}
                  matchText={card.back}
                  key={index}
                />
              );
            })}
            {currentSetGame?.map((card, index) => {
              return (
                <CardDnD
                  text={card.back}
                  matchText={card.front}
                  key={index}
                />
              );
            })}
          </div>
        </div>
      )}
      <Modal
        overlayClassName={cx('modal-overlay')}
        className={cx('modal-container')}
        isOpen={isOpenModal}
      >
        <div className={cx('modal-content')}>
          <div className={cx('title-game')}>
            Make everything disappear!
          </div>
          <div className={cx('description')}>
            Drag corresponding items onto each other to make them
            disappear.
          </div>
          <button
            onClick={handleStartGame}
            className={cx('btn-start')}
          >
            Start game
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default Match;
