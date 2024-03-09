import express from "express";

const router = express.Router();

const initWebRoute = (app) => {
  router.get("/", (req, res) => {
    res.send("Hello word");
  });

  app.use("/", router);
};

export default initWebRoute;
