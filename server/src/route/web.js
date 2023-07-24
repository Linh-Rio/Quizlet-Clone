import express from "express";

import { userController, studySetController } from "../controllers";

let router = express.Router();

let initWebRoutes = (app) => {
  router.post("/api/signup", userController.handleSignUp);
  router.post("/api/login", userController.handleLogin);
  router.post("/api/create-set", studySetController.handleCreateSet);

  return app.use("/", router);
};

module.exports = initWebRoutes;
