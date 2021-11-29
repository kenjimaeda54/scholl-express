import jwt from "jsonwebtoken";
import User from "../models/User";

export default async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      errors: ["Precisa de token"],
    });
  }
  const [, token] = authorization.split(" ");

  try {
    const { id, email } = jwt.verify(token, process.env.TOKEN_SECRET);
    //toda vez que  o email do usuario for alterado,
    //preciso redirecionar para fazer novo token
    const user = await User.findOne({ where: { id, email } });
    //se nao encontrar usuario no banco porque email alterou
    if (!user) {
      return res.status(401).json({
        errors: ["Token invalido ou expirado"],
      });
    }
    req.userId = id;
    req.email = email;
    next();
  } catch (e) {
    console.log(e);
    return res.status(401).json({
      errors: ["Token inválido"],
    });
  }
};
