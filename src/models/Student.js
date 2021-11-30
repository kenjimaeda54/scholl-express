import Sequelize, { Model } from "sequelize";

export default class Student extends Model {
  static init(sequelize) {
    super.init(
      {
        // campo default value e importantissimo para validar: validar o modelo
        name: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            notEmpty: {
              msg: "Campo nome não pode ser vazio",
            },
          },
        },
        secondName: {
          type: Sequelize.STRING,
          defaultValue: "",
          validate: {
            notEmpty: {
              msg: "Campo nome não pode ser vazio",
            },
          },
        },
        email: {
          type: Sequelize.STRING,
          defaultValue: "",
          unique: {
            msg: "Email já cadastrado",
          },
          validate: {
            isEmail: {
              msg: "Email inválido",
            },
          },
        },
        old: {
          type: Sequelize.INTEGER,
          defaultValue: "",
          validate: {
            isInt: {
              msg: "Campo old,precisa ser inteiro",
            },
            notEmpty: {
              msg: "Campo nome não pode ser vazio",
            },
          },
        },
        weight: {
          type: Sequelize.FLOAT,
          defaultValue: "",
          validate: {
            isFloat: {
              msg: "Campo weight,Numero precisa ser inteiro ou de casas decimais",
            },
            notEmpty: {
              msg: "Campo nome não pode ser vazio",
            },
          },
        },
        height: {
          type: Sequelize.FLOAT,
          defaultValue: "",
          validate: {
            isFloat: {
              msg: "Campo height,Numero precisa ser inteiro ou de casas decimais",
            },
            notEmpty: {
              msg: "Campo nome não pode ser vazio",
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
    this.hasMany(models.Photo, { foreignKey: "students_id" });
  }
}
