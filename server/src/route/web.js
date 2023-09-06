import express from "express";

import { userController, studySetController } from "../controllers";

let router = express.Router();

let initWebRoutes = (app) => {
  router.post("/api/signup", userController.handleSignUp);
  router.post("/api/login", userController.handleLogin);
  router.post("/api/create-set", studySetController.handleCreateSet);

  router.get("/api/search", studySetController.handleGetSearch);
  router.get("/api/study-set", studySetController.handleGetSet);
  router.get("/api/set-detail/", studySetController.handleGetSetDetail);

  router.delete("/api/delete-set", studySetController.handleDeleteSet);

  return app.use("/", router);
};

module.exports = initWebRoutes;
