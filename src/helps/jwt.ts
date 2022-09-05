import * as jwt from "jsonwebtoken";

export const generarJWT = (uid) => {
  return new Promise((resolve, reject) => {
    const payload = {
      uid,
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      {
        expiresIn: "24H",
      },
      (err, token) => {
        if (err) {
          console.error(err);
          reject("No se pudo generar el JWT");
        } else {
          resolve(token);
        }
      }
    );
  });
};
