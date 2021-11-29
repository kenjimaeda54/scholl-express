import multer from "multer";
import { extname, resolve } from "path";
//com extname é para pegar o tipo de arquivo
//resolve é para pegar o caminho absoluto

const randomNumber = () => Math.floor(Math.random() * 10000 + 10000);

export default {
  fileFilter: (req, file, cb) => {
    if (file.mimetype !== "image/jpeg" || file.mimetype !== "image/png") {
      return cb(
        new multer.MulterError("Arquivo precisa ser png ou jpg"),
        false
      );
    }
    return cb(null, true);
  },
  storage: multer.diskStorage({
    destination: (req, file, cab) => {
      //primeiro parametro e o erro,
      //segundo parametro e o caminho absoluto
      cab(null, resolve(__dirname, "..", "..", "uploads"));
    },
    filename: (req, file, cab) => {
      //file.originalname é o nome original do arquivo
      //construo uma string com o nome do arquivo e o numero aleatorio
      //assim garanto que o nome do arquivo seja unico
      cab(
        null,
        `${Date.now()}$_${randomNumber()}${extname(file.originalname)}`
      );
    },
  }),
};
