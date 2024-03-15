import express from "express";
import dotenv from "dotenv";
import configViewEngine from "./config/viewEngine/config";
import initWebRoute from "./routes/web";
import bodyParser from "body-parser";
import connection from "./config/connectDB";

dotenv.config();

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

configViewEngine(app);
initWebRoute(app);

connection();

app.listen(process.env.PORT || 8080, () => {
  console.log(`Server is running on port ${process.env.PORT || 8080}`);
});
