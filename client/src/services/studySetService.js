import httpRequest from '../utils/httpRequest';

const handleCreateSet = async (studySet, terms) => {
  return await httpRequest.post('/api/create-set', {
    studySet,
    terms,
  });
};

const handleGetSet = async () => {
  return await httpRequest.get('/api/study-set');
};

export { handleCreateSet, handleGetSet };
