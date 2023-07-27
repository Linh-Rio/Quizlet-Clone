import db from "../models";

let handleCreateSet = async (data) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = {};
      let vocabSetData = JSON.parse(data.studySet);
      let listTerms = JSON.parse(data.terms);
      let isExist = await checkStudySet(
        vocabSetData.user_id,
        vocabSetData.title
      );
      if (!isExist) {
        let vocabSet = (
          await db.VocabSet.create({
            title: vocabSetData.title,
            description: vocabSetData.description
              ? vocabSetData.description
              : "",
            user_id: vocabSetData.user_id,
          })
        ).get({ raw: true });

        let keysToDelete = ["updatedAt", "createdAt"];
        for (let key of keysToDelete) {
          delete vocabSet[key];
        }
        result.vocabset = vocabSet;
        let flashCard = {};
        let listFlashCard = await Promise.all(
          listTerms.map(async (term) => {
            flashCard = (
              await db.FlashCard.create({
                front: term.term,
                back: term.definition,
                image: term.image ? term.image : null,
                vocabset_id: vocabSet.id,
              })
            ).get({ raw: true });
            for (let key of keysToDelete) {
              delete flashCard[key];
            }
            return flashCard;
          })
        );
        result.listFlashCard = listFlashCard;
        result.errCode = 0;
        result.errMessage = "ok";
      } else {
        result.errCode = 1;
        result.errMessage = "You have been create study set before";
      }

      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

let checkStudySet = async (user_id, title) => {
  return new Promise(async (resolve, reject) => {
    try {
      let vocabSets = await db.VocabSet.findAll({
        where: { user_id },
      });
      vocabSets.map((vocabSet) => {
        if (vocabSet.title === title) {
          resolve(true);
        }
      });
      resolve(false);
    } catch (e) {
      reject(e);
    }
  });
};

const handleGetSet = () => {
  return new Promise(async (resolve, reject) => {
    try {
      const result = {};
      const vocabSets = await db.VocabSet.findAll({
        attributes: ["id", "title", "description"],
        include: [
          {
            model: db.User,
            attributes: ["userName", "avatar"],
          },
          {
            model: db.FlashCard,
            attributes: ["front", "back"],
          },
        ],
      });
      result.errMessage = "ok";
      result.errCode = 0;
      result.vocabSets = vocabSets;
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

module.exports = { handleCreateSet, handleGetSet };
