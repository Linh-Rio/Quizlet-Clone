import React from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './BodyStyle.module.scss';
import StudySet from '../StudySet/StudySet';

const cx = classNames.bind(styles);

const Body = ({ listStudySet }) => {
  return (
    <div className={cx('container')}>
      {listStudySet?.map((set, index) => {
        return (
          <Link to={`${set.id}/${set.title}`} key={index}>
            <StudySet
              title={set.title}
              userName={set.User.userName}
              listTerms={set.FlashCards}
            />
          </Link>
        );
      })}
    </div>
  );
};

export default Body;
