import classNames from 'classnames/bind';
import styles from './LearnFlashCardsStyle.module.scss';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import ShowCard from '../../components/ShowCard/ShowCard';
import FeatureHeader from '../../components/FeatureHeader/FeatureHeader';
import { useDispatch, useSelector } from 'react-redux';
import { getSetDetail } from '../../redux/slices/studySet';

const cx = classNames.bind(styles);

const LearnFlashCards = () => {
  const { setId } = useParams();
  const studySet = useSelector((state) => state.studySet.setDetail);
  const dispatch = useDispatch();

  const [listFlashCard, setListFlashCard] = useState([]);
  const [currentTerm, setCurrentTerm] = useState(0);
  const [isFront, setIsFront] = useState(true);

  useEffect(() => {
    dispatch(getSetDetail(setId));
    //error 404 not resolve. It can resolve after
  }, [setId, dispatch]);

  useEffect(() => {
    setListFlashCard(studySet?.FlashCards);
  }, [studySet]);

  return (
    <div className={cx('container')}>
      <FeatureHeader setId={setId} studySet={studySet} />

      <ShowCard
        isFront={isFront}
        listFlashCard={listFlashCard}
        currentTerm={currentTerm}
        setCurrentTerm={setCurrentTerm}
        setIsFront={setIsFront}
      />
    </div>
  );
};

export default LearnFlashCards;
