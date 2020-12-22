const jwt = require("jsonwebtoken");

const auth = (req, res, next) => {
  let header, token;

  if (
    !(header = req.header("Authorization")) ||
    !(token = header.replace("Bearer ", ""))
  ) {
    return res.status(401).json({
      status: "Error",
      message: "Access Denied",
    });
  }
  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET_KEY);
    req.user = verified;
    next();
  } catch (err) {
    return res.status(401).json({
      status: "Error",
      message: "Invalid Token",
    });
  }
};

module.exports = {
  auth,
};
