import multer from "multer";
import multerConfig from "../config/multerConfig";

const upload = multer(multerConfig).single("photo");

class Home {
  store(req, res, next) {
    return upload(req, res, (err) => {
      if (err) {
        return res.status(400).json({ error: [err.code] });
      }
      return res.json(req.file);
    });
  }
}

export default new Home();
