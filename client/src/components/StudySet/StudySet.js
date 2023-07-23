import classNames from 'classnames/bind';
import styles from './StudySetStyle.module.scss';

const cx = classNames.bind(styles);

const StudySet = () => {
  return (
    <div className={cx('container')}>
      <div className={cx('title')}>IOT-102</div>
      <div className={cx('num-terms')}>9 terms</div>
      <div className={cx('account')}>
        <div className={cx('avatar')}></div>
        <div className={cx('user-name')}>Vanlinh765</div>
      </div>
    </div>
  );
};

export default StudySet;
