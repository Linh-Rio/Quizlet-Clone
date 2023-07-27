import classNames from 'classnames/bind';
import styles from './StudySetStyle.module.scss';

const cx = classNames.bind(styles);

const StudySet = ({ title, userName, listTerms }) => {
  return (
    <div className={cx('container')}>
      <div className={cx('title')}>{title}</div>
      <div className={cx('num-terms')}>{listTerms.length} terms</div>
      <div className={cx('account')}>
        <div className={cx('avatar')}></div>
        <div className={cx('user-name')}>{userName}</div>
      </div>
    </div>
  );
};

export default StudySet;
