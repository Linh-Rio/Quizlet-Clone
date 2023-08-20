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

        await Promise.all(
          listTerms.map(async (term) => {
            await db.FlashCard.create({
              front: term.term,
              back: term.definition,
              image: term.image ? term.image : null,
              vocabset_id: vocabSet.id,
            });
          })
        );

        const newVocabset = await db.VocabSet.findOne({
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
          where: { id: vocabSet.id },
        });

        const customVocabSet = {
          id: newVocabset.id,
          title: newVocabset.title,
          description: newVocabset.description,
          userName: newVocabset.User.userName,
          avatar: newVocabset.User.avatar,
          totalTerm: newVocabset.FlashCards.length,
        };

        result.vocabset = customVocabSet;
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
        order: [["createdAt", "DESC"]],
      });

      const customVocabSets = vocabSets.map((vocabSet) => {
        return {
          id: vocabSet.id,
          title: vocabSet.title,
          description: vocabSet.description,
          userName: vocabSet.User.userName,
          avatar: vocabSet.User.avatar,
          totalTerm: vocabSet.FlashCards.length,
        };
      });

      result.errMessage = "ok";
      result.errCode = 0;
      result.vocabSets = customVocabSets;
      resolve(result);
    } catch (error) {
      reject(error);
    }
  });
};

const handleDeleteSet = (id) => {
  return new Promise(async (resolve, reject) => {
    let result = {};

    try {
      const isDelete = await db.VocabSet.destroy({
        where: { id },
      });

      if (isDelete) {
        result.errCode = 0;
        result.errMessage = "delete success";
      } else {
        result.errCode = 1;
        result.errMessage = "id not found";
      }

      resolve(result);
    } catch (error) {
      result.errCode = 0;
      result.errMessage = error.message;
      reject(result);
    }
  });
};

const getSetDetailService = (id) => {
  return new Promise(async (resolve, reject) => {
    let result = {};
    let isExist = await studySetIsExist(id);

    if (!isExist) {
      result.errCode = 1;
      result.errMessage = "Studyset is not exist";
      resolve(result);
    }
    try {
      const data = await db.VocabSet.findOne({
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
        where: { id: id },
      });
      result.errCode = 0;
      result.errMessage = "success";
      result.studySet = data;

      resolve(result);
    } catch (error) {
      result.errCode = 0;
      result.errMessage = error.message;
      reject(result);
    }
  });
};

let studySetIsExist = (id) => {
  return new Promise(async (resolve, reject) => {
    try {
      let vocabSet = await db.VocabSet.findOne({
        where: { id },
      });
      if (vocabSet) {
        resolve(true);
      } else {
        resolve(false);
      }
    } catch (e) {
      reject(e);
    }
  });
};

module.exports = {
  handleCreateSet,
  handleGetSet,
  handleDeleteSet,
  getSetDetailService,
};
