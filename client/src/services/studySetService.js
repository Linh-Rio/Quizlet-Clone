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

const handleDeleteSet = async (id) => {
  return await httpRequest.delete('/api/delete-set', {
    data: {
      id,
    },
  });
};

const handleGetSetDetail = async (id) => {
  return await httpRequest.get('/api/set-detail', {
    params: {
      id,
    },
  });
};

export {
  handleCreateSet,
  handleGetSet,
  handleDeleteSet,
  handleGetSetDetail,
};
