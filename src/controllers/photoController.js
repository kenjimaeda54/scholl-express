import multer from "multer";
import multerConfig from "../config/multerConfig";
import Photos from "../models/Photo";

const upload = multer(multerConfig).single("photo");

class PhotoController {
  store(req, res, next) {
    return upload(req, res, async (err) => {
      console.log(err);
      if (err) {
        return res.status(400).json({ errors: [err.code] });
      }
      const { filename, originalname } = req.file;
      const { students_id } = req.body;
      const photos = await Photos.create({
        file_name: filename,
        original_name: originalname,
        students_id,
      });
      const { id, file_name, original_name } = photos;
      return res.json({ id, file_name, original_name });
    });
  }
}

export default new PhotoController();
