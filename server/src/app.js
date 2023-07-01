import express from "express";
import bodyParser from "body-parser";

import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
require("dotenv").config();

let app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);

connectDB();

let PORT = process.env.PORT || 5001;

app.listen(PORT, () => {
  console.log("Backend Nodejs is runing on the port: " + PORT);
});
