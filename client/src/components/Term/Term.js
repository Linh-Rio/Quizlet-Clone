import classNames from 'classnames/bind';
import styles from './TermStyle.module.scss';

const cx = classNames.bind(styles);

const Term = ({ term, definition }) => {
  return (
    <div className={cx('container')}>
      <div className={cx('term')}>{term}</div>
      <div className={cx('definiton')}>{definition}</div>
    </div>
  );
};

export default Term;
