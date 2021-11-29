import multer from "multer";
import { extname, resolve } from "path";
//com extname é para pegar o tipo de arquivo
//resolve é para pegar o caminho absoluto

const randomNumber = () => Math.floor(Math.random() * 10000 + 10000);

export default {
  storage: multer.diskStorage({
    destination: (_, file, cb) => {
      //primeiro parametro e o erro,
      //segundo parametro e o caminho absoluto
      cb(null, resolve(__dirname, "..", "..", "uploads"));
    },
    filename: (__, file, cb) => {
      //file.originalname é o nome original do arquivo
      //construo uma string com o nome do arquivo e o numero aleatorio
      //assim garanto que o nome do arquivo seja unico
      cb(null, `${Date.now()}__${randomNumber()}${extname(file.originalname)}`);
    },
  }),
};
