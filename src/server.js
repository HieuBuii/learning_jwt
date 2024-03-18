import express from "express";
import dotenv from "dotenv";
import configViewEngine from "./config/viewEngine/config";
import initWebRoute from "./routes/web";
import initWebRouteApi from "./routes/app";
import bodyParser from "body-parser";
import connection from "./config/connectDB";

dotenv.config();

const app = express();

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", process.env.FE_HOST);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, PUT, POST, DELETE, PATCH"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Accept, Content-Type, Authorization, X-Requested-With"
  );
  res.setHeader("Access-Control-Allow-Credentials", true);

  next();
});

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

configViewEngine(app);
// initWebRoute(app);
initWebRouteApi(app);

connection();

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server is running on port ${process.env.PORT || 8080}`);
});
