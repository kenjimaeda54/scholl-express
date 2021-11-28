import { Router } from "express";
import userController from "../controllers/userController";
import LoginRequired from "../middleware/LoginRequired";

const routes = new Router();

//se voce olhar no arquivo app a rota la e /users,
//entao no final a rota vai ser /users
//se querer dar um put eu faria aqui apenas /:id
routes.post("/", userController.store);
routes.get("/", LoginRequired, userController.index);
routes.get("/:id", userController.show);
routes.put("/:id", userController.update);
routes.delete("/:id", userController.destroy);

export default routes;

/*
index=> listagem de usuários - GET
show=> exibir um usuário - GET
store | create=> criar um usuário - POST
update=> atualizar um usuário - PUT ou PATCH
destroy| delete => deletar um usuário - DELETE
*/
