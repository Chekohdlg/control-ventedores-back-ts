/*
    Ruta: /api/usuarios
*/

import { Router } from "express";
import { check } from "express-validator";
import {
  crearUsuario,
  getUsuarios,
  borrarUsuario,
  actualizarUsuario,
  getUsuario,
} from "../controllers/usuarios";
import { validarJWT } from "../middlewares/validar-jwt";
import { validarCampos } from "../middlewares/validarr-campos";

export const usersRouter = Router();
const routerName = "/usuarios";

usersRouter.get(routerName, getUsuarios);

usersRouter.get(`${routerName}/:id`, getUsuario);

usersRouter.post(
  routerName,
  [
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("password", "El pass es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),

    validarCampos,
  ],
  crearUsuario
);

usersRouter.put(
  `${routerName}/:id`,
  [
    validarJWT,
    check("nombre", "The name is mandatory").not().isEmpty(),
    check("email", "The email is mandatory").isEmail(),
    check("role", "the rol is mandatory").not().isEmpty(),

    validarCampos,
  ],
  actualizarUsuario
);

usersRouter.delete(`${routerName}/:id`, borrarUsuario);
