import express from "express";
import * as userController from "../controller/userController";

const router = express.Router();

const initWebRoute = (app) => {
  router.get("/user", userController.handleGetListUser);
  router.post("/user/create-user", userController.handleCreateUser);
  router.post("/user/delete-user/:id", userController.handleDeleteUser);
  router.get("/user/update-user/:id", userController.handleGetUser);
  router.post("/user/update-user", userController.handleUpdateUser);

  app.use("/", router);
};

export default initWebRoute;
