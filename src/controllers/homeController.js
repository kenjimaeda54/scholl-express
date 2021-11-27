class Home {
  index(req, res, next) {
    res.send({
      title: "Api rest",
    });
  }
}

export default new Home();
