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
} from "../controllers/usuarios";
import { validarJWT } from "../middlewares/validar-jwt";
import { validarCampos } from "../middlewares/validarr-campos";

export const usersRouter = Router();
const routerName = "/usuarios";

usersRouter.get(routerName, validarJWT, getUsuarios);

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
  `${routerName}:id`,
  [
    validarJWT,
    check("nombre", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("role", "El rol es obligatorio").not().isEmpty(),

    validarCampos,
  ],
  actualizarUsuario
);

usersRouter.delete(`${routerName}:id`, validarJWT, borrarUsuario);
