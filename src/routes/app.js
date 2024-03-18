import express from "express";
import * as userApiController from "../controller/userApiController";

const router = express.Router();

const initWebRouteApi = (app) => {
  router.post("/regiter", userApiController.handleCreateUser);
  router.post("/login", userApiController.handleLogin);
  router.get("/users", userApiController.handleGetUsers);
  router.put("/users/update", userApiController.handleUpdateUser);
  router.delete("/users/delete", userApiController.handleDeleteUsers);

  app.use("/api", router);
};

export default initWebRouteApi;
