import Sequelize, { Model } from "sequelize";
import bcrypt from "bcryptjs";
//Sequelize ja possui o validator do sequelize
//comandos iguais do validator

export default class User extends Model {
  static init(sequelize) {
    super.init(
      {
        name: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            notEmpty: {
              msg: "O nome não pode ser vazio",
            },
          },
        },
        email: {
          type: Sequelize.STRING,
          defaultValue: "",
          unique: {
            msg: "Este email já está em uso",
          },
          validate: {
            isEmail: {
              msg: "Email precisa ser valido",
            },
          },
        },
        password_hash: {
          type: Sequelize.STRING,
          defaultValue: "",
        },
        password: {
          type: Sequelize.VIRTUAL,
          defaultValue: "",
          validate: {
            len: {
              args: [6, 12],
              msg: "Senha precisa ter entre 6 e 12 caracteres",
            },
          },
        },
      },
      {
        sequelize,
      }
    );
    //estou adicionado um hooks para fazer hash da senha antes de salvar no banco
    this.addHook("beforeSave", async (user) => {
      user.password_hash = await bcrypt.hash(user.password, 8);
    });
    return this;
  }
}
