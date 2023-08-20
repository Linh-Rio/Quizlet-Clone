import studySetservice from "../services/studySetService";

const handleCreateSet = async (req, res) => {
  const { title, user_id } = JSON.parse(req.body.studySet);
  const terms = JSON.parse(req.body.terms);

  if (title.length && user_id) {
    if (terms.length >= 2) {
      let studySet = await studySetservice.handleCreateSet(req.body);
      return res.status(200).json({
        errCode: studySet.errCode,
        message: studySet.errMessage,
        vocabset: studySet.vocabset ? studySet.vocabset : {},
      });
    } else {
      return res.status(500).json({
        errCode: 2,
        message: "Studyset needs more than 2 terms",
        vocabset: {},
      });
    }
  } else {
    return res.status(500).json({
      errCode: 1,
      message: "Missing tile of set",
      vocabset: {},
    });
  }
};

const handleGetSet = async (req, res) => {
  try {
    const studySet = await studySetservice.handleGetSet();
    return res.status(200).json({
      errCode: studySet.errCode,
      message: studySet.errMessage,
      vocabSets: studySet.vocabSets,
    });
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

const handleDeleteSet = async (req, res) => {
  const id = req.body.id;
  if (!id) {
    return res.status(500).json({
      errCode: 1,
      message: "missing id for delete studyset",
    });
  }
  const data = await studySetservice.handleDeleteSet(id);
  return res.status(200).json({
    errCode: data.errCode,
    message: data.errMessage,
  });
};

const handleGetSetDetail = async (req, res) => {
  const id = parseInt(req.query.id);
  if (!id) {
    return res.status(500).json({
      errCode: 1,
      message: "missing id for get studyset",
      studySet: {},
    });
  }
  const data = await studySetservice.getSetDetailService(id);
  if (data.errCode === 1) {
    return res.status(404).json({
      errCode: data.errCode,
      message: data.errMessage,
      studySet: {},
    });
  }
  return res.status(200).json({
    errCode: data.errCode,
    message: data.errMessage,
    studySet: data.studySet,
  });
};

module.exports = {
  handleCreateSet,
  handleGetSet,
  handleDeleteSet,
  handleGetSetDetail,
};
