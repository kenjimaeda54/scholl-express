import User from "../models/User";
import jsw from "jsonwebtoken";
import { config } from "dotenv";

class Token {
  async store(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password) {
        return res.status(401).json({
          errors: ["Credenciais erradas"],
        });
      }
      //user ja esta fazendo a instancia da classe User
      //entao os metodos que estao em User estao disponiveis no user
      const user = await User.findOne({ where: { email } });
      if (!user) {
        return res.status(400).json({
          errors: ["Email invalido"],
        });
      }
      //metodo que esta no model User
      if (!(await user.comparePassword(password))) {
        return res.status(401).json({
          errors: ["Senha invalida"],
        });
      }
      const { id } = user;
      const token = jsw.sign({ id, email }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION,
      });
      res.json({ token });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((error) => error.message),
      });
    }
  }
}

export default new Token();
