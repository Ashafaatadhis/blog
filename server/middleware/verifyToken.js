const jwt = require("jsonwebtoken");
const verifyToken = async (req, res, next) => {
  //   const token = req.cookies.refreshToken;
  // melakukan get authorizatino bearer token
  const token = req.headers["authorization"] && req.headers["authorization"].split(" ")[1];
  // lalu ambil data user where refresh token
  console.log(token);
  if (token == null) res.sendStatus(401).json({ msg: "You not authorized" });
  jwt.verify(token, process.env.PRIVATE_KEY, async (err, decoded) => {
    if (err) {
      res.status(401).json({ msg: "You not authorized" });
      return;
    }
    // console.log(decoded);

    req.body.username = decoded.username;
    req.body.password = decoded.password;
    next();
  });
};

module.exports = verifyToken;
