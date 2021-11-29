import User from "../models/User";

class UserController {
  //essas duas rotas sao apenas para consultas nossas,
  //nao precisamos dessas rotas para nosso sistema
  // async index(req, res) {
  //   try {
  //     const users = await User.findAll();
  //     res.json(users);
  //   } catch (e) {
  //     console.log(e);
  //   }
  // }

  // async show(req, res) {
  //   try {
  //     const user = await User.findByPk(req.params.id);
  //     res.json(user);
  //   } catch (e) {
  //     return res.status(null);
  //   }
  // }
  //--------------------------.//
  async store(req, res) {
    try {
      const user = await User.create(req.body);
      const { id, name, email } = user;
      return res.json({ id, name, email });
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: e.errors.map((error) => error.message),
      });
    }
  }

  async update(req, res) {
    try {
      const user = await User.findByPk(req.userId);
      if (!user) {
        return res.status(401).json({
          errors: ["Usuario não encontrado"],
        });
      }
      const { id, email, name } = await user.update(req.body);
      return res.json({ email, id, name });
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((error) => error.message),
      });
    }
  }
  async destroy(req, res) {
    try {
      const user = await User.findByPk(req.userId);
      await user.destroy(user);
      return res.json(null);
    } catch (e) {
      return res.json(null);
    }
  }
}

export default new UserController();
