import * as jwt from "jsonwebtoken";

export const validarJWT = (req, res, next) => {
  //leer token
  const token = req.header("x-token");

  if (!token) {
    return res.status(401).json({
      ok: false,
      msg: "No hay token en la peticion",
    });
  }

  try {
    const { uid } = JSON.parse(
      JSON.stringify(jwt.verify(token, process.env.JWT_SECRET))
    );

    req.uid = uid;

    next();
  } catch (error) {
    return res.status(401).json({
      ok: false,
      msg: "token incorrecto",
    });
  }
};
