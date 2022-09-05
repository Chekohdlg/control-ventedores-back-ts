/*
    Path: '/api/login
*/

import { Router } from "express";
import { body, validationResult } from "express-validator";
import { login } from "../controllers/auth";
import { validarCampos } from "../middlewares/validarr-campos";
import { check } from "express-validator";

export const routerAouth = Router();

const routerName = "/login";

routerAouth.get(routerName, (request, response) => {
  response.send("Hello world!");
});

routerAouth.post(
  routerName,
  [
    check("email", "El email es obligatorio ").isEmail(),
    check("password", "El password es obligatorio").not().isEmpty(),
    validarCampos,
  ],
  login
);
