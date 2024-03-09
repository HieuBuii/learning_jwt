import express from "express";
import dotenv from "dotenv";
import configViewEngine from "./config/viewEngine/config";
import initWebRoute from "./routes/web";

dotenv.config();

const app = express();

configViewEngine(app);
initWebRoute(app);

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server is running on port ${process.env.PORT || 8080}`);
});
