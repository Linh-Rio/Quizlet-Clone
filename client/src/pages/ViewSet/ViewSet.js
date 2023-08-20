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
  faArrowLeft,
  faArrowRight,
  faCircleNodes,
  faGraduationCap,
  faPen,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import Button from '../../components/Button/Button';

import { deleteStudySet } from '../../redux/slices/studySet';
import { useEffect, useState } from 'react';
import { handleGetSetDetail } from '../../services/studySetService';
import ShowCard from '../../components/ShowCard/ShowCard';

const cx = classNames.bind(styles);

const ViewSet = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [studySet, setStudySet] = useState({});
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await handleGetSetDetail(setId);
        setStudySet(response.studySet);
      } catch (error) {
        console.error('Error fetching data:', error);
        if (error.response.status === 404) {
          navigate('/set-not-found');
        }
      }
    };

    fetchData();
  }, [setId]);

  useEffect(() => {
    setListFlashCard(studySet?.FlashCards);
  }, [studySet]);

  const handleDeleteSet = () => {
    const payload = { id: studySet.id };
    dispatch(deleteStudySet(payload));
    navigate('/');
  };

  return (
    <div className={cx('container')}>
      <Header />
      <h1 className={cx('title')}>{studySet.title}</h1>
      <div className={cx('funtion')}>
        {funtionButtons.map((button, index) => {
          return (
            <Button
              logo={button.logo}
              text={button.text}
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
            {studySet?.User?.userName}
          </span>
        </div>
        {user.userName === studySet?.User?.userName ? (
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
        {studySet.description}
      </span>

      <span
        className={cx('information')}
      >{`Terms in this set (${studySet?.FlashCards?.length})`}</span>
      {/*Display list Term*/}
      {studySet.FlashCards?.map((card, index) => {
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
