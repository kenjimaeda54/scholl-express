import Photo from "../models/Photo";
import multer from "multer";
import MulterConfig from "../config/multerConfig";

const upload = multer(MulterConfig).single("photo");

class Home {
  store(req, res, next) {
    return upload(req, res, async (err) => {
      try {
        if (err) {
          return res.status(400).send({
            error: [err.code],
          });
        }
        const { students_id } = req.body;
        const { filename, originalname } = req.file;
        const { id, file_name, original_name } = await Photo.create({
          file_name: filename,
          original_name: originalname,
          students_id,
        });
        return res.send({ id, file_name, original_name, students_id });
      } catch (e) {
        return res.status(400).send({
          errors: ["Usuario nao existe"],
        });
      }
    });
  }
}

export default new Home();
