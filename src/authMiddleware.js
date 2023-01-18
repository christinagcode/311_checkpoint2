let jwt = require("jsonwebtoken");
let JWT_SECRET = process.env.JWT_SECRET;

let checkJWT = function (req, res, next) {
    
  let header = req.get("Authorization");
  if (header) {
    let parts = header.split(" ");
    signedToken = parts[1];
  }
  if (!signedToken) {
    console.log("No signed token to check");
    res.sendStatus(403);
    return;
  }

  try {
    let token = jwt.verify(signedToken, JWT_SECRET);
    console.log("this is the token:", token);
    req["_token"] = token;
    next();
  } catch (err) {
    console.error("Could not verify the token", err);
    res.sendStatus(403);
    return;
  }
};

module.exports = { checkJWT };
