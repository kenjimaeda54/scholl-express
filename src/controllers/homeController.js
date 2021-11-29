class Home {
  index(req, res, next) {
    res.send({
      title: "Api rest cadastro de alunos",
    });
  }
}

export default new Home();
