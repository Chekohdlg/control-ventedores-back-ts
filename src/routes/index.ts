import express from "express";
import { defaultRoute } from "./defaultRoute";
import { routerAouth } from "./auth";
import { usersRouter } from "./usuarios";
import { validarJWT } from "../middlewares/validar-jwt";

export const routes = express.Router();
routes.use(defaultRoute);
routes.use(routerAouth);
routes.use(validarJWT, usersRouter); //first add the validation then the routes/controllers
