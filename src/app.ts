import express from "express";
import dbConnection from "./database/config";
import cors from "cors";

import * as dotenv from "dotenv"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
dotenv.config({ path: __dirname + "/.env" }); //add this option to know where the .env file is

import { routes } from "./routes";
//create the server
const app = express();

//add cors
app.use(cors());

//reading and parsing the body
app.use(express.json());

dbConnection();

//Add router
app.use("/api", routes);

app.listen(process.env.PORT, () => {
  return console.log(
    `Express is listening at http://localhost:${process.env.PORT}`
  );
});
