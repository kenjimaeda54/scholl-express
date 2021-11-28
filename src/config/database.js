require("dotenv").config();
//apos configurar o banco fazer comando
//npx sequelize migration:create --name=Nome da tabela,neste caso students"
module.exports = {
  dialect: "mariadb",
  host: process.env.DATABASE_HOST,
  port: process.env.DATABASE_PORT,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE,
  define: {
    timestamp: true,
    underscored: true,
    underscoredAll: true,
    createAt: "created_at",
    updatedAt: "updated_at",
  },
  dialectOptions: {
    timezone: "America/Sao_Paulo",
  },
  timezone: "America/Sao_Paulo",
};
