import express from "express";
import { defaultRoute } from "./defaultRoute";
import { routerAouth } from "./auth";
import { usersRouter } from "./usuarios";

export const routes = express.Router();
routes.use(defaultRoute);
routes.use(routerAouth);
routes.use(usersRouter);
