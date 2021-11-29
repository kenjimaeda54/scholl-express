import Students from "../models/Student";

class StudentController {
  async index(req, res, next) {
    try {
      const students = await Students.findAll();
      if (students.length > 0) {
        const { email, name, secondName, height, weight, old } = students;
        return res.send(students);
      }
      return res.send({ registros: 0 });
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
