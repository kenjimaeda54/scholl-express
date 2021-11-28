import Sequelize, { Model } from "sequelize";

export default class Aluno extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        secondName: Sequelize.STRING,
        email: Sequelize.STRING,
        old: Sequelize.INTEGER,
        weight: Sequelize.FLOAT,
        height: Sequelize.FLOAT,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}
