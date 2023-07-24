import studySetservice from "../services/studySetService";

const handleCreateSet = async (req, res) => {
  const { title, user_id } = JSON.parse(req.body.studySet);
  const terms = JSON.parse(req.body.terms);

  if (title.length && user_id) {
    if (terms.length > 2) {
      let studySet = await studySetservice.handleCreateSet(req.body);
      return res.status(200).json({
        errCode: studySet.errCode,
        message: studySet.errMessage,
        vocabset: studySet.vocabset ? studySet.vocabset : {},
        listFlashCard: studySet.listFlashCard ? studySet.listFlashCard : [],
      });
    } else {
      return res.status(500).json({
        errCode: 2,
        message: "Studyset needs more than 2 terms",
        vocabset: {},
        listFlashCard: [],
      });
    }
  } else {
    return res.status(500).json({
      errCode: 1,
      message: "Missing tile of set",
      vocabset: {},
      listFlashCard: [],
    });
  }
};

module.exports = { handleCreateSet };