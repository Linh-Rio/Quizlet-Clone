import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import classNames from 'classnames/bind';
import styles from './TestModal.module.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faAngleDown,
  faListCheck,
  faXmark,
} from '@fortawesome/free-solid-svg-icons';
import Tippy from '@tippyjs/react/headless';
import { Switch } from '@mui/material';
import { useDispatch } from 'react-redux';
import { testSetting } from '../../redux/slices/test';

const cx = classNames.bind(styles);
Modal.setAppElement('#root');

const TestModal = ({ studySet, listFlashCard }) => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(true);
  const [numberQuestion, setNumberQuestion] = useState(20);
  const [answerType, setAnswerType] = useState('Term');
  const [isTrueFalse, setIsTrueFalse] = useState(false);
  const [isMultiple, setIsMultiple] = useState(true);
  const [isMatching, setIsMatching] = useState(false);
  const [isWritten, setIsWritten] = useState(false);

  useEffect(() => {
    if (studySet?.FlashCards?.length) {
      setNumberQuestion(Math.min(studySet?.FlashCards?.length, 20));
    }
  }, [studySet]);

  const handleStart = () => {
    const payload = {
      numberQuestion: numberQuestion,
      answerType: answerType,
      isTrueFalse: isTrueFalse,
      isMultiple: isMultiple,
      isMatching: isMatching,
      isWritten: isWritten,
    };
    dispatch(testSetting(payload));
    setOpenModal(false);
  };

  const handleSwitchChange = (switchName) => {
    if (switchName === 'isTrueFalse') {
      setIsTrueFalse(!isTrueFalse);
    } else if (switchName === 'isMultiple') {
      setIsMultiple(!isMultiple);
    } else if (switchName === 'isMatching') {
      setIsMatching(!isMatching);
    } else if (switchName === 'isWritten') {
      setIsWritten(!isWritten);
    }
  };

  const switches = [
    {
      name: 'isTrueFalse',
      label: 'True/False',
      checked: isTrueFalse,
    },
    {
      name: 'isMultiple',
      label: 'Multiple Choice',
      checked: isMultiple,
    },
    {
      name: 'isMatching',
      label: 'Matching',
      checked: isMatching,
    },
    { name: 'isWritten', label: 'Written', checked: isWritten },
  ];

  const checkedSwitches = switches.filter(
    (switchItem) => switchItem.checked,
  );

  // Prevent unchecking the last checked switch
  const handleSwitchToggle = (switchName) => {
    if (
      checkedSwitches.length === 1 &&
      checkedSwitches[0].name === switchName
    ) {
      return;
    }
    handleSwitchChange(switchName);
  };

  return (
    <Modal
      isOpen={openModal}
      className={cx('modal-container')}
      overlayClassName={cx('overlay-modal')}
    >
      <div>
        <div className={cx('test-header')}>
          <div className={cx('header-text')}>
            <h3 className={cx('text-title')}>{studySet?.title}</h3>
            <h2 className={cx('text-content')}>Set up your test</h2>
            <span className={cx('cancel')} onClick={handleStart}>
              <FontAwesomeIcon icon={faXmark} />
            </span>
          </div>
          <span className={cx('header-image')}>
            <FontAwesomeIcon icon={faListCheck} />
          </span>
        </div>
        <div className={cx('test-option')}>
          <div className={cx('option')}>
            <label>Questtions (max {listFlashCard?.length})</label>
            <input
              type="number"
              className={cx('input')}
              value={numberQuestion}
              onChange={(e) => {
                const inputValue = parseInt(e.target.value, 10);
                if (
                  inputValue <= (listFlashCard?.length || 0) &&
                  inputValue >= 2
                ) {
                  setNumberQuestion(e.target.value);
                }
              }}
            />
          </div>

          <div className={cx('option')}>
            <label>Answer with</label>

            <Tippy
              placement="bottom-end"
              offset={[0, 5]}
              interactive
              // hideOnClick="true"
              appendTo={document.body}
              trigger="click"
              render={(attrs) => (
                <div
                  tabIndex="-1"
                  {...attrs}
                  className={cx('answer-container')}
                >
                  <div
                    onClick={() => setAnswerType('Term')}
                    className={cx('answer-choice')}
                  >
                    Term
                  </div>
                  <div
                    onClick={() => setAnswerType('Definition')}
                    className={cx('answer-choice')}
                  >
                    Definition
                  </div>
                  <div
                    onClick={() => setAnswerType('Both')}
                    className={cx('answer-choice')}
                  >
                    Both
                  </div>
                </div>
              )}
            >
              <div className={cx('select-answer')}>
                <span>{answerType} </span>
                <span>
                  <FontAwesomeIcon icon={faAngleDown} />
                </span>
              </div>
            </Tippy>
          </div>
        </div>
        <div className={cx('test-setting')}>
          {switches.map((switchItem) => (
            <div className={cx('option')} key={switchItem.name}>
              <label>{switchItem.label}</label>
              <Switch
                checked={switchItem.checked}
                onChange={() => handleSwitchToggle(switchItem.name)}
              />
            </div>
          ))}
        </div>
        <div className={cx('test-footer')}>
          <span className={cx('footer-text')}>
            You can further customise your test in the Options menu
          </span>
          <button onClick={handleStart} className={cx('button')}>
            Start test
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default TestModal;
