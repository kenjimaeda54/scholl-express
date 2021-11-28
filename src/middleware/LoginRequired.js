import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({
      errors: ["Precisa login  para rotas autenticadas"],
    });
  }

  const [, token] = authorization.split(" ");

  try {
    const { id, email } = jwt.verify(token, process.env.TOKEN_SECRET);
    req.userId = id;
    req.email = email;
    return next();
  } catch (e) {
    console.log(e);
    return res.status(401).json({
      errors: ["Token invalido"],
    });
  }
};
