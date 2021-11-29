class Home {
  store(req, res, next) {
    res.send({
      //se fosse mais que um arquivo seria req.files
      //req.file é o arquivo que esta sendo enviado
      //ele e apenas liberado apos instar o multer
      photo: req.file,
    });
  }
}

export default new Home();
