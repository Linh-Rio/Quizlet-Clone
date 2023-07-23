import React from 'react';
import classNames from 'classnames/bind';
import styles from './BodyStyle.module.scss';

import StudySet from '../StudySet/StudySet';

const cx = classNames.bind(styles);

const Body = () => {
  return (
    <div className={cx('container')}>
      <StudySet />
      <StudySet />
      <StudySet />
    </div>
  );
};

export default Body;
