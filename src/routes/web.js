import express from "express";
import * as homeController from "../controller/homeController";
import * as userController from "../controller/userController";

const router = express.Router();

const initWebRoute = (app) => {
  router.get("/", homeController.goHomePage);

  router.post("/user/create-user", userController.handleCreateUser);

  app.use("/", router);
};

export default initWebRoute;
