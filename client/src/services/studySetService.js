import httpRequest from '../utils/httpRequest';

const handleCreateSet = async (studySet, terms) => {
  return await httpRequest.post('/api/create-set', {
    studySet,
    terms,
  });
};

export { handleCreateSet };
