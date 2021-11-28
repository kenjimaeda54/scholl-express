import User from "../models/User";

class UserController {
  async store(req, res) {
    try {
      const user = await User.create(req.body);
      return res.json(user);
    } catch (e) {
      console.log(e);
      return res.status(400).json({
        errors: e.errors.map((error) => error.message),
      });
    }
  }

  async index(req, res) {
    try {
      const users = await User.findAll();
      res.json(users);
    } catch (e) {
      console.log(e);
    }
  }

  async show(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      res.json(user);
    } catch (e) {
      return res.status(null);
    }
  }
  async update(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(400).json({
          errors: ["Usuario nao encontrado"],
        });
        return;
      }
      await user.update(req.body);
      return res.json(user);
    } catch (e) {
      return res.status(400).json({
        errors: e.errors.map((error) => error.message),
      });
    }
  }
  async destroy(req, res) {
    try {
      const user = await User.findByPk(req.params.id);
      if (!user) {
        return res.status(400).json({
          errors: ["Usuario nao encontrado"],
        });
        return;
      }
      await user.destroy(user);
      return res.json(user);
      return res.json(user);
    } catch (e) {
      return res.json(null);
    }
  }
}

export default new UserController();
