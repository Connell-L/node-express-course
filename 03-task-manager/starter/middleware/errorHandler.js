const { CustomAPIError } = require('../errors/customError');

const errorHandlerMiddleware = (err, req, res, next) => {
  if (err instanceof CustomAPIError) {
    return res.status(err.statusCode).json({ msg: err.message });
  }
  return res.status(500).json({ msg: 'Something went wrong, plese try again.' });
};

module.exports = errorHandlerMiddleware;