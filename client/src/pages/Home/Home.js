import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import Header from '../../components/Header';
import Body from '../../components/Body/Body';
import { getStudySet } from '../../redux/slices/studySet';

const Home = () => {
  const dispatch = useDispatch();
  const studySets = useSelector((state) => state.studySet.listSets);
  useEffect(() => {
    dispatch(getStudySet());
  }, [dispatch]);

  return (
    <>
      <Header />
      <Body listStudySet={studySets} />
    </>
  );
};

export default Home;
