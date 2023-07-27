import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';

import Body from '../../components/Body/Body';
import { getStudySet } from '../../redux/slices/studySet';

const Home = () => {
  const dispatch = useDispatch();
  const studySets = useSelector((state) => state.studySet.listSets);
  useEffect(() => {
    dispatch(getStudySet());
  }, [dispatch]);

  return <Body listStudySet={studySets} />;
};

export default Home;
