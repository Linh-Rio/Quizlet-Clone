import express from "express";

import userController from "../controllers/userController";

let router = express.Router();

let initWebRoutes = (app) => {
  router.post("/api/signup", userController.handleSignUp);
  router.post("/api/login", userController.handleLogin);

  return app.use("/", router);
};

module.exports = initWebRoutes;
