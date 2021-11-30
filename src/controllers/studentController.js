import Photo from "../models/Photo";
import Students from "../models/Student";

class StudentController {
  async index(req, res, next) {
    try {
      const students = await Students.findAll({
        attributes: [
          "id",
          "email",
          "name",
          "secondName",
          "height",
          "weight",
          "old",
        ],
        //id e o campo que vou ordenar
        //desc é para ordenar de forma decrescente
        //asc é para ordenar de forma crescente
        order: [
          ["id", "DESC"],
          [Photo, "id", "DESC"],
        ],
        include: {
          model: Photo,
          attributes: ["file_name"],
        },
      });
      return res.send(students);
    } catch (e) {
      console.log(e);
      return res.status(400).send({
        errors: e.errors.map((error) => error.message),
      });
    }
  }
  async show(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).send({
          error: ["Precisa do id"],
        });
      }
      const student = await Students.findByPk(id);
      if (!student) {
        return res.status(400).send({
          error: ["Aluno não encontrado"],
        });
      }
      const { email, name, secondName, height, weight, old } = student;

      return res.send({ id, email, name, secondName, height, weight, old });
    } catch (e) {
      console.log(e);
      return res.status(400).send({
        errors: e.errors.map((error) => error.message),
      });
    }
  }
  async store(req, res) {
    try {
      const body = req.body;
      await Students.create(body);
      return res.send(body);
    } catch (e) {
      console.log(e);
      return res.status(400).send({
        errors: e.errors.map((error) => error.message),
      });
    }
  }

  async update(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).send({
          error: ["Precisa do id"],
        });
      }
      const student = await Students.findByPk(id);
      if (!student) {
        return res.status(400).send({
          error: ["Aluno não encontrado"],
        });
      }
      const { email, name, secondName, height, weight, old } =
        await student.update(req.body);

      return res.send({ id, email, name, secondName, height, weight, old });
    } catch (e) {
      console.log(e);
      return res.status(400).send({
        errors: e.errors.map((error) => error.message),
      });
    }
  }

  async destroy(req, res, next) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).send({
          error: ["Precisa do id"],
        });
      }
      const student = await Students.findByPk(id);
      if (!student) {
        return res.status(400).send({
          error: ["Aluno não encontrado"],
        });
      }
      await student.destroy();
      return res.send({ apagado: true });
    } catch (e) {
      console.log(e);
      return res.status(400).send({
        errors: e.errors.map((error) => error.message),
      });
    }
  }
}

export default new StudentController();
