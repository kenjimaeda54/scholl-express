import { Router } from "express";
import photoController from "../controllers/photoController";
import multer from "multer";
import multerConfig from "../config/multerConfig";

const route = new Router();
const upload = multer(multerConfig);

//single é para upload de apenas um arquivo
//photo é o nome do campo que esta no formulario
route.post("/", upload.single("photo"), photoController.store);

export default route;
