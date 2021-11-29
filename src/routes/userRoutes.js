import { Router } from "express";
import userController from "../controllers/userController";
import LoginRequired from "../middleware/LoginRequired";

const routes = new Router();

//as rotas show e index nao fazem sentido em cenario real,
//nao faz sentido eu listar todos usuarios ou poder ver um usuario especifico
//entao eu nao quero que eu tenha uma rota /users/:id
// routes.get("/", userController.index);
// routes.get("/:id", userController.show);

//se voce olhar no arquivo app a rota la e /users,
//entao no final a rota vai ser /users
//se querer dar um put eu faria aqui apenas /:id
//nao faz sentido eu ter rota /users/:id
//porque qualquer usuario pode editar outro usuario
//entao vou usar o id do proprio usuario na requisicao para editar
//usando o middleware LoginRequired e seu token
routes.post("/", userController.store);
routes.put("/", LoginRequired, userController.update);
routes.delete("/", LoginRequired, userController.destroy);

export default routes;

/*
index=> listagem de usuários - GET
show=> exibir um usuário - GET
store | create=> criar um usuário - POST
update=> atualizar um usuário - PUT ou PATCH
destroy| delete => deletar um usuário - DELETE
*/
