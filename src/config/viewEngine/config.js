import express from "express";
import path from "path";

const configViewEngine = (app) => {
  app.use(express.static(path.join(__dirname, "public")));
  app.set("views", "src/view");
  app.set("view engine", "ejs");
};

export default configViewEngine;
