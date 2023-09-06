import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames/bind';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Term from '../../components/Term/Term';
import styles from './ViewSetStyle.module.scss';
import Header from '../../components/Header/Header';
import noImage from '../../assets/images/noImage.jpg';

import {
  faFileLines,
  faNoteSticky,
} from '@fortawesome/free-regular-svg-icons';
import {
  faCircleNodes,
  faGraduationCap,
  faPen,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import FeatureButton from '../../components/FeatureButton/FeatureButton';

import {
  deleteStudySet,
  getSetDetail,
} from '../../redux/slices/studySet';
import { useEffect, useState } from 'react';
import ShowCard from '../../components/ShowCard/ShowCard';

const cx = classNames.bind(styles);

const ViewSet = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [listFlashCard, setListFlashCard] = useState([]);
  const [currentTerm, setCurrentTerm] = useState(0);
  const [isFront, setIsFront] = useState(true);

  const { setId } = useParams();
  const funtionButtons = [
    {
      logo: <FontAwesomeIcon icon={faNoteSticky} />,
      text: 'FlashCards',
    },
    {
      logo: <FontAwesomeIcon icon={faGraduationCap} />,
      text: 'Learn',
    },
    {
      logo: <FontAwesomeIcon icon={faFileLines} />,
      text: 'Test',
    },
    {
      logo: <FontAwesomeIcon icon={faCircleNodes} />,
      text: 'Match',
    },
  ];
  const user = useSelector((state) => state.user);
  const setDetail = useSelector((state) => state.studySet?.setDetail);

  useEffect(() => {
    dispatch(getSetDetail(setId));

    //error 404 not resolve. It can resolve after
  }, [setId, dispatch]);

  useEffect(() => {
    setListFlashCard(setDetail?.FlashCards);
  }, [setDetail]);

  const handleDeleteSet = () => {
    const payload = { id: setDetail.id };
    dispatch(deleteStudySet(payload));
    navigate('/');
  };

  return (
    <div className={cx('container')}>
      <Header />
      <h1 className={cx('title')}>{setDetail.title}</h1>
      <div className={cx('funtion')}>
        {funtionButtons.map((button, index) => {
          return (
            <FeatureButton
              logo={button.logo}
              text={button.text}
              setId={setId}
              key={index}
            />
          );
        })}
      </div>
      <ShowCard
        isFront={isFront}
        listFlashCard={listFlashCard}
        currentTerm={currentTerm}
        setCurrentTerm={setCurrentTerm}
        setIsFront={setIsFront}
      />
      <div className={cx('author-action-container')}>
        <div className={cx('author')}>
          <img className={cx('avatar')} src={noImage} alt="avatar" />
          <span className={cx('text')}>Created by</span>
          <span className={cx('userName')}>
            {setDetail?.User?.userName}
          </span>
        </div>
        {user.userName === setDetail?.User?.userName ? (
          <div className={cx('action')}>
            <button className={cx('edit-btn')}>
              <FontAwesomeIcon icon={faPen} />
            </button>
            <button
              className={cx('delete-btn')}
              onClick={handleDeleteSet}
            >
              <FontAwesomeIcon icon={faTrash} />
            </button>
          </div>
        ) : undefined}
      </div>

      <span className={cx('description')}>
        {setDetail.description}
      </span>

      <span
        className={cx('information')}
      >{`Terms in this set (${setDetail?.FlashCards?.length})`}</span>
      {/*Display list Term*/}
      {setDetail.FlashCards?.map((card, index) => {
        return (
          <Term
            term={card.front}
            definition={card.back}
            key={index}
          />
        );
      })}
    </div>
  );
};

export default ViewSet;
