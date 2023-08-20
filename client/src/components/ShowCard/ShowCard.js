import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames/bind';

import styles from './ShowCardStyle.module.scss';
import {
  faArrowLeft,
  faArrowRight,
} from '@fortawesome/free-solid-svg-icons';

const cx = classNames.bind(styles);

const ShowCard = ({
  isFront,
  listFlashCard,
  currentTerm,
  setCurrentTerm,
  setIsFront,
}) => {
  return (
    <div className={cx('show-card')}>
      <div
        className={cx('term-container')}
        onClick={() => setIsFront(!isFront)}
      >
        {isFront ? (
          <p className={cx('term-text')}>
            {listFlashCard
              ? listFlashCard[currentTerm]?.front
              : 'loading...'}
          </p>
        ) : (
          <p className={cx('term-text')}>
            {listFlashCard
              ? listFlashCard[currentTerm]?.back
              : 'loading...'}
          </p>
        )}
      </div>
      <div className={cx('footer-term')}>
        <button
          className={cx('left-arrow')}
          onClick={() => {
            if (currentTerm > 0) {
              setCurrentTerm(currentTerm - 1);
              setIsFront(true);
            }
          }}
        >
          <FontAwesomeIcon icon={faArrowLeft} />
        </button>
        <span className={cx('counter')}>
          {currentTerm + 1} / {listFlashCard?.length}
        </span>
        <button
          className={cx('right-arrow')}
          onClick={() => {
            if (currentTerm < listFlashCard.length - 1) {
              setCurrentTerm(currentTerm + 1);
              setIsFront(true);
            }
          }}
        >
          <FontAwesomeIcon icon={faArrowRight} />
        </button>
      </div>
    </div>
  );
};

export default ShowCard;
