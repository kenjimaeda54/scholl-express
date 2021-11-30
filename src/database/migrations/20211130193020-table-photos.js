//apos criar a migration fazer comando
//npx sequelize db:migrate
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable("photos", {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      file_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      original_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      students_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        onDelete: "SET NULL",
        //quando campo do id atualizar vai atualizar tambem aqui
        onUpdate: "CASCADE",
        references: {
          model: "students",
          key: "id",
        },
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("photos");
  },
};
