class HomeController {
  index(req, res, next) {
    res.send({
      title: "API REST EXPRESS",
    });
  }
}

export default new HomeController();
