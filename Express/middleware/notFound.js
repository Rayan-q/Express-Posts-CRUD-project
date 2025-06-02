const notFound = (req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  // this passes the error message and status to the next middleware which is errorHandler
  // that is also used by routes in posts
  next(error);
};

export default notFound;
