const logger = (req, res, next) => {
  const method = req.method;
  const url = req.url;
  const time = new Date().getFullYear();
  console.log(method, url, time);
  // terminate
  // res.send ect or always do next for middlewere
  next();
};

module.exports = logger;