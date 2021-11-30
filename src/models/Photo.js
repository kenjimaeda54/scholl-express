import Sequelize, { Model } from "sequelize";
import bcrypt from "bcryptjs";
//Sequelize ja possui o validator do sequelize
//comandos iguais do validator

export default class Photo extends Model {
  static init(sequelize) {
    super.init(
      {
        file_name: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            notEmpty: {
              msg: "O nome não pode ser vazio",
            },
          },
        },
        original_name: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            notEmpty: {
              msg: "O nome não pode ser vazio",
            },
          },
        },
      },
      {
        sequelize,
      }
    );
    return this;
  }
  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: "students_id" });
  }
}
