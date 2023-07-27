import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';

import Header from '../../components/Header';
import Term from '../../components/Term/Term';
import styles from './ViewSetStyle.module.scss';

const cx = classNames.bind(styles);

const ViewSet = () => {
  const { setId } = useParams();
  const listSet = useSelector((state) => state.studySet.listSets);
  const Studyset = listSet?.filter((set) => {
    return set.id === parseInt(setId);
  });
  return (
    <div className={cx('container')}>
      <Header />
      <div>{Studyset[0].title}</div>
      {Studyset[0].FlashCards.map((card, index) => {
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
