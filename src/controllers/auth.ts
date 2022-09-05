import { response } from "express";
import usuario from "../models/usuario";
import bcrypt from "bcrypt";
import { generarJWT } from "../helps/jwt";

export const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    //verificar email
    const usuarioDb = await usuario.findOne({ email });

    if (!usuarioDb) {
      return res.status(400).json({
        ok: false,
        msg: "Email o Contraseña no es valido",
      });
    }

    //varificar password
    const validPassword = bcrypt.compareSync(password, usuarioDb.password);

    if (!validPassword) {
      return res.status(400).json({
        ok: false,
        msg: "Email o Contraseña no es valido",
      });
    }

    //genrrar token
    const token = await generarJWT(usuarioDb.id);

    res.json({
      ok: true,
      token,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Hable con el admin",
    });
  }
};
