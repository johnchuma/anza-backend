
module.exports.validateJWT = async (req, res, next) => {
  req.user = {}
  next()
};
