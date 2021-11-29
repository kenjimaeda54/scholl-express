import { Router } from "express";
import photoController from "../controllers/photoController";

const route = new Router();

//single é para upload de apenas um arquivo
//photo é o nome do campo que esta no formulario
route.post("/", photoController.store);

export default route;
