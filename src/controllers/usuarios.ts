import { response } from "express";
import bcrypt from "bcrypt";
import Usuario from "../models/usuario";
import { generarJWT } from "../helps/jwt";

export const getUsuarios = async (req, res) => {
  const usuarios = await Usuario.find({}, "nombre email role google img");

  res.json({
    ok: true,
    usuarios,
    uid: req.uid,
  });
};

export const crearUsuario = async (req, res = response) => {
  const { email, password, nombre } = req.body;

  try {
    const existeEmail = await Usuario.findOne({ email });

    if (existeEmail) {
      return res.status(400).json({
        ok: false,
        msg: "El correo ya existe",
      });
    }

    const usuario = new Usuario(req.body);

    //encriptar contraseñá
    const salt = bcrypt.genSaltSync();
    usuario.password = bcrypt.hashSync(password, salt);

    await usuario.save();

    const token = await generarJWT(usuario.id);

    res.json({
      ok: true,
      usuario,
      token,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Resvisar logica",
    });
  }
};

export const actualizarUsuario = async (req, res = response) => {
  const uid = req.params.id;

  try {
    const usuarioDb = await Usuario.findById(uid);

    if (!usuarioDb) {
      return res.status(404).json({
        ok: false,
        msg: "No existe el usuario de ese id",
      });
    }

    //TODO: validar usuario correcto

    //actualizacion
    const { password, google, email, ...campos } = req.body;

    if (usuarioDb.email !== email) {
      const existeEmail = await Usuario.findOne({ email });
      if (existeEmail) {
        return res.status(400).json({
          ok: false,
          msg: "Ya existe un usuario con ese email",
        });
      }
    }

    campos.email = email;

    const usuarioActualizado = await Usuario.findByIdAndUpdate(uid, campos, {
      new: true,
    });

    res.json({
      ok: true,
      usuario: usuarioActualizado,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: error,
    });
  }
};

export const borrarUsuario = async (req, res = response) => {
  try {
    const uuid = req.params.id;

    const usuarioDb = await Usuario.findById(uuid);

    if (!usuarioDb) {
      return res.status(404).json({
        ok: false,
        msg: "No existe el usuario de ese id",
      });
    }

    await Usuario.findOneAndDelete(uuid);

    res.json({
      ok: true,
      msg: "Usuario eliminado",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      ok: false,
      msg: "Favor de contactar con el admin",
    });
  }
};

export const getUsuario = async (req, res) => {
  console.log(
    "🚀 ~ file: usuarios.ts ~ line 129 ~ getUsuario ~ req",
    req.params
  );

  const usuarios = await Usuario.findById(
    req.params.id,
    "nombre email role google img"
  );

  res.json({
    ok: true,
    usuarios,
    uid: req.uid,
  });
};
