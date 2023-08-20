import classNames from 'classnames/bind';
import styles from './StudySetStyle.module.scss';

const cx = classNames.bind(styles);

const StudySet = ({ title, userName, totalTerm, avatar }) => {
  return (
    <div className={cx('container')}>
      <div className={cx('title')}>{title}</div>
      <div className={cx('num-terms')}>{totalTerm} terms</div>
      <div className={cx('account')}>
        <div className={cx('avatar')}></div>
        <div className={cx('user-name')}>{userName}</div>
      </div>
    </div>
  );
};

export default StudySet;
