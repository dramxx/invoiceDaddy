const jwt = require("jsonwebtoken");

/**
 * Verifies, if user has valid jwt token to access the api route
 */
module.exports = (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) return res.status(401).send("No token");

  try {
    const { exp } = jwt.decode(token);
    if (Date.now() >= exp * 1000) return false;

    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;

    next();
  } catch (error) {
    res.status(400).send("Invalid token");
  }
};
