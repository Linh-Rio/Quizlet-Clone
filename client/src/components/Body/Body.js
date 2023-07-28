import { useEffect } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';

import styles from './BodyStyle.module.scss';
import StudySet from '../StudySet/StudySet';
import { useDispatch, useSelector } from 'react-redux';
import { getStudySet } from '../../redux/slices/studySet';

const cx = classNames.bind(styles);

const Body = () => {
  const dispatch = useDispatch();
  const studySets = useSelector((state) => state.studySet.listSets);
  useEffect(() => {
    dispatch(getStudySet());
  }, [dispatch]);

  return (
    <div className={cx('container')}>
      {studySets?.map((set, index) => {
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
